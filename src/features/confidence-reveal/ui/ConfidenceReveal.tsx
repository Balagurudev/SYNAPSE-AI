"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useSpring, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Mascot3D } from "./Mascot3D";

interface ConfidenceRevealProps {
  score: number; // 0-100
  onComplete?: () => void;
  onRetry?: () => void;
}

export function ConfidenceReveal({ score, onComplete, onRetry }: ConfidenceRevealProps) {
  const [phase, setPhase] = useState<"analyzing" | "suspense" | "revealing" | "done">("analyzing");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  const isHighScore = score >= 80;
  const isLowScore = score < 50;

  // Use a spring for high score to give it a bouncy, energetic pop.
  // Use a damped, slow finish for low score to feel heavy and disappointing.
  const springCount = useSpring(0, {
    stiffness: isHighScore ? 100 : 40,
    damping: isHighScore ? 15 : 20,
    mass: isHighScore ? 1 : 2,
  });
  
  const springRounded = useTransform(springCount, (latest) => Math.round(latest));
  const springStrokeDashoffset = useTransform(springCount, [0, 100], [628.3, 0]);

  useEffect(() => {
    // 1. Analyzing Phase
    const suspenseTimer = setTimeout(() => {
      setPhase("suspense");
      
      // 2. Suspense Phase (brief pause before the number flies up)
      const revealTimer = setTimeout(() => {
        setPhase("revealing");
        
        if (isHighScore) {
          // High Score: Explosive spring animation
          springCount.set(score);
          setTimeout(() => setPhase("done"), 1500); // Wait for spring to settle
        } else {
          // Low Score: Heavy, draggy linear/easeOut animation
          animate(count, score, {
            duration: 2.5,
            ease: [0.25, 1, 0.5, 1], // Custom slow down curve
            onComplete: () => setPhase("done")
          });
        }
      }, 800); // Suspense hold
      
      return () => clearTimeout(revealTimer);
    }, 2000); // Initial analyzing time

    return () => clearTimeout(suspenseTimer);
  }, [score, isHighScore, count, springCount]);

  // Set spinning border glow to the vibrant purple brand colors
  const color1 = "#7e22ce"; // Deep vibrant purple (Purple 700)
  const color2 = "#d946ef"; // Vibrant fuchsia/pink to make it pop!

  const gradientStyle = {
    background: `linear-gradient(-45deg, ${color1} 10%, transparent 40%, transparent 60%, ${color2} 90%)`
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes speen {
          0% { transform: rotate(10deg); }
          50% { transform: rotate(190deg); }
          to { transform: rotate(370deg); }
        }
        .spin-element {
          position: absolute;
          inset: -50%;
          animation: speen 8s cubic-bezier(0.56, 0.15, 0.28, 0.86) infinite;
        }
      `}} />

      {/* Outer Glows - Maximized for Light Mode Vibrancy */}
      <div className="absolute inset-[-6px] z-[-3] rounded-[22px] filter blur-[16px] opacity-60 overflow-hidden">
        <div className="spin-element" style={gradientStyle} />
      </div>
      <div className="absolute inset-[-3px] z-[-2] rounded-[18px] filter blur-[8px] opacity-100 overflow-hidden">
        <div className="spin-element" style={gradientStyle} />
      </div>

      <div className="flex flex-col items-center justify-center p-[48px] bg-white rounded-[16px] shadow-[0_0_40px_-10px_rgba(126,34,206,0.15)] min-h-[500px] relative z-0">
        
        {/* Animated Inner Border (Replaces static border) */}
        <div className="absolute inset-0 z-[-2] overflow-hidden rounded-[16px]">
          <div className="spin-element" style={gradientStyle} />
        </div>
        
        {/* Crisp White Card Background (creates the 3px border gap) */}
        <div className="absolute inset-[3px] bg-white rounded-[13px] z-[-1]" />

        {/* Background Ambience */}
      <AnimatePresence>
        {phase === "done" && isHighScore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-success-50/50 via-white to-white pointer-events-none"
          />
        )}
        {phase === "done" && isLowScore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/30 via-white to-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .confidence-loader-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background-color: transparent;
          animation: confidence-loader-combined 2.3s linear infinite;
          z-index: 0;
        }
        @keyframes confidence-loader-combined {
          0% {
            transform: rotate(90deg);
            box-shadow: 0 6px 12px 0 #8b5cf6 inset, 0 12px 18px 0 #6d28d9 inset, 0 36px 36px 0 #4c1d95 inset, 0 0 3px 1.2px rgba(139, 92, 246, 0.3), 0 0 6px 1.8px rgba(109, 40, 217, 0.2);
          }
          25% {
            transform: rotate(180deg);
            box-shadow: 0 6px 12px 0 #a78bfa inset, 0 12px 18px 0 #8b5cf6 inset, 0 36px 36px 0 #6d28d9 inset, 0 0 6px 2.4px rgba(139, 92, 246, 0.3), 0 0 12px 3.6px rgba(109, 40, 217, 0.2), 0 0 18px 6px rgba(76, 29, 149, 0.15);
          }
          50% {
            transform: rotate(270deg);
            box-shadow: 0 6px 12px 0 #c4b5fd inset, 0 12px 6px 0 #8b5cf6 inset, 0 24px 36px 0 #6d28d9 inset, 0 0 3px 1.2px rgba(139, 92, 246, 0.3), 0 0 6px 1.8px rgba(109, 40, 217, 0.2);
          }
          75% {
            transform: rotate(360deg);
            box-shadow: 0 6px 12px 0 #8b5cf6 inset, 0 12px 18px 0 #7c3aed inset, 0 36px 36px 0 #5b21b6 inset, 0 0 6px 2.4px rgba(139, 92, 246, 0.3), 0 0 12px 3.6px rgba(109, 40, 217, 0.2), 0 0 18px 6px rgba(76, 29, 149, 0.15);
          }
          100% {
            transform: rotate(450deg);
            box-shadow: 0 6px 12px 0 #8b5cf6 inset, 0 12px 18px 0 #6d28d9 inset, 0 36px 36px 0 #4c1d95 inset, 0 0 3px 1.2px rgba(139, 92, 246, 0.3), 0 0 6px 1.8px rgba(109, 40, 217, 0.2);
          }
        }
      `}} />

      {/* 3D Mascot Area */}
      <div className="relative w-[360px] h-[360px] flex items-center justify-center mb-[10px]">
        <Mascot3D score={score} phase={phase} />
      </div>

      {/* Messaging Area */}
      <div className="w-full text-center min-h-[180px] relative z-10 flex flex-col items-center justify-start mt-[24px]">
        <AnimatePresence mode="wait">
          {phase === "analyzing" && (
            <motion.div
              key="msg-analyzing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full"
            >
              <h3 className="text-[18px] font-semibold text-slate-900">Evaluating Performance</h3>
              <p className="text-[14px] text-slate-500 mt-[4px]">Synthesizing structure, delivery, and content...</p>
            </motion.div>
          )}

          {phase === "suspense" && (
            <motion.div
              key="msg-suspense"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full"
            >
              <h3 className="text-[18px] font-bold text-primary-purple">Finalizing Score...</h3>
            </motion.div>
          )}

          {(phase === "done" || phase === "revealing") && (
            <motion.div
              key="msg-done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="w-full"
            >
              {isHighScore ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <motion.span className="text-[48px] font-black text-success-600 leading-none">
                      {springRounded}
                    </motion.span>
                    <h3 className="text-[22px] font-bold text-slate-900 flex items-center justify-center gap-[10px]">
                      <CheckCircle2 className="w-[24px] h-[24px] text-success-500" /> Amazing Job!
                    </h3>
                  </div>
                  <p className="text-[15px] text-slate-500">I absolutely loved how you handled that! You sounded completely natural and hit every key point effortlessly.</p>
                </>
              ) : isLowScore ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <motion.span className="text-[48px] font-black text-orange-600 leading-none">
                      {rounded}
                    </motion.span>
                    <h3 className="text-[22px] font-bold text-slate-900 flex items-center justify-center gap-[10px]">
                      <AlertTriangle className="w-[24px] h-[24px] text-orange-500" /> Don't Worry!
                    </h3>
                  </div>
                  <p className="text-[15px] text-slate-500">Interviewing can be tricky, but practice makes perfect. Let's take a deep breath and try again—you've got this!</p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <motion.span className="text-[48px] font-black text-slate-900 leading-none">
                      {rounded}
                    </motion.span>
                    <h3 className="text-[22px] font-bold text-slate-900">Good Effort!</h3>
                  </div>
                  <p className="text-[15px] text-slate-500">You are definitely on the right track! With just a few small structural tweaks, your delivery will be golden.</p>
                </>
              )}
              
              <div className="flex items-center justify-center gap-[12px] mt-[32px]">
                <Button variant="secondary" onClick={onRetry} className="h-[44px] px-[24px]">Retake Interview</Button>
                <Button variant="primary" onClick={onComplete} className="h-[44px] px-[24px]">View Detailed Feedback</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  );
}
