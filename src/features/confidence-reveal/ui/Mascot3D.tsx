import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface MascotProps {
  score: number | null;
  phase: "analyzing" | "suspense" | "revealing" | "done";
}

// The Robot Head Component
function RobotHead({ expression, color }: { expression: string, color: string }) {
  const headRef = useRef<THREE.Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const sadFaceRef = useRef<SVGSVGElement>(null);
  const supportiveFaceRef = useRef<SVGSVGElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);
  
  // Bobbing and Mouse-Tracking animation
  useFrame((state, delta) => {
    if (!headRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Base breathing/bobbing offsets
    let baseY = Math.sin(t * 2) * 0.05;
    let baseXRot = 0;
    let baseYRot = 0;
    let baseZRot = 0;
    
    if (expression === "happy") {
      baseY = Math.sin(t * 6) * 0.08; // Energetic bounce
      baseZRot = Math.sin(t * 3) * 0.05; // Slight playful head tilt
    } else if (expression === "sad") {
      // STORYTELLING SEQUENCE: Transition from sad downcast to supportive lift
      const fadeProgress = THREE.MathUtils.clamp((t - 3.5) / 1.0, 0, 1); // 1-sec transition starting at 3.5s
      
      // Interpolate sine wave parameters instead of outputs to prevent jagged phase jumps
      const currentFreq = THREE.MathUtils.lerp(1.5, 3.0, fadeProgress);
      const currentAmp = THREE.MathUtils.lerp(0.03, 0.05, fadeProgress);
      const currentYOffset = THREE.MathUtils.lerp(-0.05, 0, fadeProgress);
      
      baseY = Math.sin(t * currentFreq) * currentAmp + currentYOffset;
      baseXRot = THREE.MathUtils.lerp(0.15, 0, fadeProgress); // Smoothly lift head
      
      // Crossfade the SVG faces
      if (sadFaceRef.current && supportiveFaceRef.current) {
        sadFaceRef.current.style.opacity = (1 - fadeProgress).toString();
        supportiveFaceRef.current.style.opacity = fadeProgress.toString();
      }

      // Animate speech bubble tooltip after entrance sequence finishes
      if (speechBubbleRef.current) {
        const bubbleProgress = THREE.MathUtils.clamp((t - 4.0) / 0.5, 0, 1);
        speechBubbleRef.current.style.opacity = bubbleProgress.toString();
        const bubbleScale = THREE.MathUtils.clamp((t - 4.0) / 0.5, 0.8, 1);
        speechBubbleRef.current.style.transform = `scale(${bubbleScale})`;
      }
    } else if (expression === "angry") {
      baseY = Math.sin(t * 8) * 0.04; // Fast trembling
      baseXRot = Math.sin(t * 12) * 0.02; // Jittering
    } else {
      baseY = Math.sin(t * 3) * 0.05; // Normal breathing
    }

    // ENTRANCE SEQUENCE: Rise from below (t = 0.5s to 1.5s)
    let entranceY = baseY;
    if (t < 0.5) {
      entranceY = -2.5; // Hidden inside the puck
    } else if (t < 1.5) {
      // Smooth cubic ease-out from -2.5 up to baseY
      const progress = (t - 0.5) / 1.0;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      entranceY = THREE.MathUtils.lerp(-2.5, baseY, easeOut);
    }

    // Mouse Tracking: Calculate target rotations based on cursor position
    const targetRotX = baseXRot - (state.mouse.y * Math.PI) / 6;
    const targetRotY = baseYRot + (state.mouse.x * Math.PI) / 4;

    // Smoothly interpolate current rotation/position towards targets
    const damping = 1 - Math.exp(-10 * delta);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotX, damping);
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotY, damping);
    headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, baseZRot, damping);
    headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, entranceY, damping);
    
    // ENTRANCE SEQUENCE: Fade in expression face (t = 1.2s to 1.6s)
    if (htmlRef.current) {
      const exprOpacity = THREE.MathUtils.clamp((t - 1.2) / 0.4, 0, 1);
      htmlRef.current.style.opacity = exprOpacity.toString();
      const exprScale = THREE.MathUtils.clamp((t - 1.2) / 0.4, 0.8, 1);
      htmlRef.current.style.transform = `scale(${exprScale})`;
    }
  });

  return (
    <group ref={headRef} position={[0, -2.5, 0]}>
      {/* Speech Bubble Tooltip (Only for Sad/Supportive Sequence) */}
      {expression === "sad" && (
        <Html position={[1.4, 1.4, 0]} center zIndexRange={[100, 0]}>
          <div 
            ref={speechBubbleRef}
            className="bg-white/90 backdrop-blur-md text-slate-800 px-[16px] py-[12px] rounded-[16px] shadow-xl border border-white/40 opacity-0 w-[200px]"
            style={{ 
              pointerEvents: 'none',
              transformOrigin: 'bottom left' 
            }}
          >
            <p className="text-[13px] font-semibold leading-snug">
              Interviewing is tough, but practice makes perfect! Let's try again! 💙
            </p>
            {/* Tooltip Pointer Triangle */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/90 backdrop-blur-md border-b border-l border-white/40 transform -rotate-45" />
          </div>
        </Html>
      )}

      {/* Main White Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial 
          color="#e2e8f0" 
          roughness={0.4} 
          metalness={0.1}
          envMapIntensity={0.4}
        />
      </mesh>

      {/* Black Visor Screen - Spherical cap pointing forward */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1.22, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.1} 
          metalness={0.8}
        />
      </mesh>

      {/* Ears (Left & Right Dark Discs) */}
      <mesh position={[-1.18, 0, 0]} scale={[0.4, 1, 1]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[1.18, 0, 0]} scale={[0.4, 1, 1]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Holographic Face Overlay */}
      <Html 
        transform 
        position={[0, 0.05, 1.15]} 
        scale={0.35} 
        zIndexRange={[100, 0]}
      >
        <div 
          ref={htmlRef}
          className="flex flex-col items-center justify-center w-[250px] h-[120px] relative transition-opacity duration-75 opacity-0" 
          style={{ 
            color, 
            filter: `drop-shadow(0px 0px 4px ${color}) drop-shadow(0px 0px 10px ${color})` 
          }}
        >
          {expression === "happy" && (
            <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
              {/* Thick arched eyes */}
              <path d="M 22 25 Q 30 15 38 25" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              <path d="M 62 25 Q 70 15 78 25" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              {/* Huge wide open mouth */}
              <path d="M 35 34 Q 50 55 65 34 Z" fill="currentColor" />
            </svg>
          )}
          {expression === "sad" && (
            <div className="w-full h-full relative z-10">
              {/* Initial Sympathetic Frown */}
              <svg ref={sadFaceRef} viewBox="0 0 100 50" className="w-full h-full absolute inset-0">
                <path d="M 24 30 Q 32 20 40 25" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M 76 30 Q 68 20 60 25" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M 40 40 Q 50 35 60 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
              {/* Supportive Subtle Smile (Crossfades in at 3.5s) */}
              <svg ref={supportiveFaceRef} viewBox="0 0 100 50" className="w-full h-full absolute inset-0 opacity-0">
                <circle cx="30" cy="25" r="5" fill="currentColor" />
                <circle cx="70" cy="25" r="5" fill="currentColor" />
                {/* Very subtle, genuine smile (not sarcastic) */}
                <path d="M 42 36 Q 50 40 58 36" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </div>
          )}
          {expression === "angry" && (
            <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
              {/* Squeezed > < eyes */}
              <path d="M 22 22 L 32 26 L 22 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 78 22 L 68 26 L 78 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Huge wide open mouth (oval) */}
              <ellipse cx="50" cy="38" rx="16" ry="10" fill="currentColor" />
              {/* Lightning bolt */}
              <path d="M 52 8 L 48 16 L 54 16 L 46 25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {expression === "idle" && (
            <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
              {/* Pulsing dots perfectly centered on the eye line (y=25) */}
              <circle cx="35" cy="25" r="4" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0ms" }} />
              <circle cx="50" cy="25" r="4" fill="currentColor" className="animate-pulse" style={{ animationDelay: "200ms" }} />
              <circle cx="65" cy="25" r="4" fill="currentColor" className="animate-pulse" style={{ animationDelay: "400ms" }} />
            </svg>
          )}
          {expression === "smile" && (
            <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
              {/* Left Eye: Normal */}
              <circle cx="32" cy="24" r="5" fill="currentColor" />
              {/* Right Eye: Normal */}
              <circle cx="68" cy="24" r="5" fill="currentColor" />
              {/* Happy Smile */}
              <path d="M 40 37 Q 50 43 58 36" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            </svg>
          )}
          {expression === "suspense" && (
            <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
              {/* Wide open eyes centered at x=30, x=70 */}
              <circle cx="30" cy="25" r="6" fill="currentColor" />
              <circle cx="70" cy="25" r="6" fill="currentColor" />
              {/* Small tight mouth */}
              <circle cx="50" cy="40" r="3" fill="currentColor" />
            </svg>
          )}
        </div>
      </Html>
    </group>
  );
}

// The Holographic Base & Light Beam
function HologramBase({ color }: { color: string }) {
  const beamMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  // ENTRANCE SEQUENCE: Laser beam opens up (t = 0s to 0.5s)
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (beamMaterialRef.current) {
      // Fade in from 0 to 0.08 over 0.5s
      const targetOpacity = THREE.MathUtils.clamp(t / 0.5, 0, 1) * 0.08;
      beamMaterialRef.current.opacity = targetOpacity;
    }
  });

  // Convert color hex to a THREE color and multiply intensity for bloom
  const glowColor = new THREE.Color(color).multiplyScalar(4);

  return (
    <group position={[0, -2.5, 0]}>
      {/* Dark Puck Base - Thick curved torus half-buried */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.2, 0.6, 64, 64]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Inner Floor of the base */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      
      {/* Glowing Emissive Inner Ring */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.0, 64]} />
        <meshBasicMaterial color={glowColor} toneMapped={false} />
      </mesh>

      {/* Spreading Volumetric Light Cylinder */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[2.2, 0.8, 3.0, 64, 1, true]} />
        <meshBasicMaterial 
          ref={beamMaterialRef}
          color={color} 
          transparent 
          opacity={0} 
          side={THREE.DoubleSide} 
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

export function Mascot3D({ score, phase }: MascotProps) {
  // Determine expression and color based on score/phase
  let expression = "idle";
  let color = "#00aaff"; // Default to the exact deep luminous blue

  if (phase === "analyzing") {
    expression = "idle";
    color = "#8b5cf6"; // Purple while analyzing
  } else if (phase === "suspense") {
    expression = "suspense";
    color = "#a78bfa";
  } else if (phase === "done" || phase === "revealing") {
    if (score !== null) {
      if (score >= 80) {
        expression = "happy";
      } else if (score < 50) {
        expression = "sad"; // Tearful
      } else {
        expression = "angry"; // Solid effort but frustrated
      }
      color = "#00aaff"; // Enforce the exact deep blue color for ALL final states
    }
  }

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0.5, 7.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Postprocessing Bloom adjusted for high intensity but strictly above threshold */}
        <EffectComposer>
          <Bloom luminanceThreshold={1.0} mipmapBlur intensity={2.5} />
        </EffectComposer>

        {/* Environment map makes the glossy head look realistic */}
        <Environment preset="city" />

        <group position={[0, -0.2, 0]} scale={1.1}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <RobotHead expression={expression} color={color} />
          </Float>
          
          <HologramBase color={color} />
        </group>
      </Canvas>
    </div>
  );
}

// Export a standalone version of the mascot (just the head) without the base or laser
export function StandaloneMascot() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Environment preset="city" />
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          {/* We pass the 'smile' expression and the primary purple color */}
          <RobotHead expression="smile" color="#7e22ce" />
        </Float>
      </Canvas>
    </div>
  );
}
