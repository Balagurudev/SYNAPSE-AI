"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronRight, Sparkles, Video, Type, Bot, ChevronDown, Upload, FileText, Loader2, Clock, CheckCircle2, AlertTriangle, TrendingUp, UserCheck, Plus, ArrowLeft, Mic, Eye, Sun, Settings, PhoneOff, Maximize2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { QuestionCard } from "@/entities/question/ui/QuestionCard";
import { InterviewQuestion } from "@/entities/question/model/types";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import { ConfidenceReveal } from "@/features/confidence-reveal/ui/ConfidenceReveal";
import { StandaloneMascot } from "@/features/confidence-reveal/ui/Mascot3D";
import { Check } from "lucide-react";

export function InterviewPrep() {
  const [step, setStep] = useState<"dashboard" | "idle" | "processing" | "results" | "video" | "reveal">("dashboard");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("Alex (Senior Dev)");
  const [mode, setMode] = useState<"text" | "video">("text");
  const [difficulty, setDifficulty] = useState("Adaptive (Easy to Hard)");
  const [numQuestions, setNumQuestions] = useState("10");
  const [mockScore, setMockScore] = useState<number>(91);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [hasCompletedVideoMock, setHasCompletedVideoMock] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  
  const [toneLibrary, setToneLibrary] = useState<string[]>(["Conversational", "Direct", "Analytical", "Executive", "Humble", "Technical", "Empathetic", "Storyteller"]);
  const [inferredTones, setInferredTones] = useState<string[]>(["Conversational", "Direct", "Analytical"]);
  const [customToneInput, setCustomToneInput] = useState("");
  const [activeRoleTab, setActiveRoleTab] = useState("Senior Frontend Engineer");

  const roleHistory = [
    {
      role: "Senior Frontend Engineer",
      tone: "Technical & Analytical",
      interviews: [
        { date: "Oct 12, 2026", score: 91, insight: "Strong STAR method, watch pacing." },
        { date: "Oct 10, 2026", score: 78, insight: "Tone was defensive on conflict question." }
      ]
    },
    {
      role: "Product Manager",
      tone: "Executive & Strategic",
      interviews: [
        { date: "Oct 05, 2026", score: 85, insight: "Good vision, but lacked specific metrics." }
      ]
    }
  ];

  const toggleTone = (tone: string) => {
    setInferredTones(prev => 
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    );
  };

  const handleAddCustomTone = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customToneInput.trim()) {
      e.preventDefault();
      const newTone = customToneInput.trim();
      if (!toneLibrary.includes(newTone)) {
        setToneLibrary(prev => [...prev, newTone]);
      }
      if (!inferredTones.includes(newTone)) {
        setInferredTones(prev => [...prev, newTone]);
      }
      setCustomToneInput("");
    }
  };

  const agentDetails: Record<string, { tone: string }> = {
    "Alex (Senior Dev)": { tone: "Technical & Analytical" },
    "Manager Persona": { tone: "Executive & Strategic" },
    "new": { tone: "Upload Resume to Detect" }
  };

  const mockQuestions: InterviewQuestion[] = [
    {
      id: "q1",
      question: "Can you describe a time when you had to manage competing priorities with tight deadlines?",
      answer: "In my previous role, I frequently managed overlapping project launches. I utilized an Eisenhower Matrix to categorize tasks by urgency and importance, ensuring critical paths were unblocked. By communicating transparently with stakeholders about realistic timelines, I successfully delivered 3 concurrent projects without sacrificing quality.",
      difficulty: "Medium",
      reasoning: "This answer demonstrates clear organizational skills using a recognized framework (Eisenhower Matrix). It highlights proactive communication, which is exactly what a hiring manager wants to see when balancing multiple projects."
    },
    {
      id: "q2",
      question: "How do you handle disagreements with a product manager regarding technical debt versus new features?",
      answer: "I approach these disagreements as collaborative problem-solving. I quantify the impact of technical debt—such as slower future development or system instability—and present it alongside the feature request. We then find a compromise, perhaps dedicating 20% of the sprint to tech debt, ensuring business goals are met while maintaining system health.",
      difficulty: "Hard",
      reasoning: "This perfectly hits the 'collaborative' and 'analytical' tones requested. By quantifying technical debt, it moves the conversation away from opinion and into business impact, proving you can think like an engineering leader."
    },
    {
      id: "q3",
      question: "Tell me about a time you failed or made a significant mistake. How did you handle it?",
      answer: "Early in my career, I deployed code that caused a minor outage. I immediately rolled back the deployment, communicated the issue to my team, and wrote a detailed post-mortem analyzing the root cause. I then implemented an automated test suite to ensure that specific edge case was caught in the future.",
      difficulty: "Hard",
    },
    {
      id: "q4",
      question: "Describe your process for onboarding onto a completely new codebase.",
      answer: "I start by running the application locally and exploring the UI to understand the user journey. Then, I read through the documentation and architecture diagrams. Next, I dive into a small, low-risk bug ticket, using it as an excuse to trace the execution flow through the codebase and ask targeted questions to the senior engineers.",
      difficulty: "Easy",
    },
    {
      id: "q5",
      question: "How do you ensure your code is accessible to all users?",
      answer: "I rely on semantic HTML as the foundation. I ensure all interactive elements are keyboard navigable, use sufficient color contrast, and provide aria-labels where necessary. I also regularly run Lighthouse audits and use screen readers during development to catch any edge cases.",
      difficulty: "Medium",
    },
    {
      id: "q6",
      question: "What is your approach to mentoring junior developers?",
      answer: "I believe in guided discovery rather than just giving the answers. During code reviews, I ask leading questions to help them realize why a different approach might be better. I also encourage pair programming sessions where they drive, allowing me to gently correct course while building their confidence.",
      difficulty: "Medium",
    },
    {
      id: "q7",
      question: "Can you explain a complex technical concept to a non-technical stakeholder?",
      answer: "I use analogies related to their domain. For instance, explaining an API to a marketing manager, I compare it to a waiter in a restaurant taking their order (request) to the kitchen (server) and bringing back their food (response). This grounds the technical abstraction in a familiar reality.",
      difficulty: "Medium",
    },
    {
      id: "q8",
      question: "How do you stay updated with the rapidly evolving frontend ecosystem?",
      answer: "I dedicate a few hours every weekend to read newsletters like Bytes or Frontend Focus. I also maintain a personal sandbox repository where I build tiny prototype apps to test out new frameworks or state management libraries before advocating for them in production code.",
      difficulty: "Easy",
    },
    {
      id: "q9",
      question: "Describe a time you had to optimize a slow-performing application.",
      answer: "We had a dashboard that took 6 seconds to load. I used Chrome DevTools to identify that a massive JSON payload was blocking the main thread. I implemented pagination on the backend, lazy-loaded the chart components, and added local caching. This reduced the initial load time to under 1.5 seconds.",
      difficulty: "Hard",
    },
    {
      id: "q10",
      question: "Where do you see your technical career progressing in the next 3 years?",
      answer: "I aim to transition into a Staff Engineer role. While I love writing code, I want to increase my impact by driving architectural decisions, standardizing best practices across multiple teams, and focusing heavily on performance and scalability at the organizational level.",
      difficulty: "Easy",
    }
  ];

function ProcessingScreen({ numQuestions, selectedAgent, difficulty }: any) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const phases = [1000, 1200, 1200];
    let timeouts: NodeJS.Timeout[] = [];
    let cumulative = 0;
    
    phases.forEach((duration, i) => {
      cumulative += duration;
      timeouts.push(setTimeout(() => setPhase(i + 1), cumulative));
    });
    
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const titles = [
    "Analyzing Job Context...",
    "Calibrating Difficulty...",
    "Synthesizing Persona...",
    "Generating Questions..."
  ];

  const currentText = titles[phase] || "Finalizing...";

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-[80px] text-center w-full h-full"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .loader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 220px;
          height: 220px;
          font-family: "Inter", sans-serif;
          font-size: 1.1em;
          font-weight: 500;
          color: #111827;
          border-radius: 50%;
          background-color: transparent;
          user-select: none;
        }
        .loader-circle {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          background-color: transparent;
          animation: loader-combined 2.3s linear infinite;
          z-index: 0;
        }
        @keyframes loader-combined {
          0% {
            transform: rotate(90deg);
            box-shadow: 0 4px 12px 0 rgba(139, 92, 246, 0.2) inset, 0 8px 18px 0 rgba(109, 40, 217, 0.2) inset, 0 0 4px 1px rgba(139, 92, 246, 0.1);
          }
          25% {
            transform: rotate(180deg);
            box-shadow: 0 4px 12px 0 rgba(167, 139, 250, 0.2) inset, 0 8px 18px 0 rgba(139, 92, 246, 0.2) inset, 0 0 4px 1px rgba(139, 92, 246, 0.1);
          }
          50% {
            transform: rotate(270deg);
            box-shadow: 0 4px 12px 0 rgba(196, 181, 253, 0.2) inset, 0 8px 18px 0 rgba(139, 92, 246, 0.2) inset, 0 0 4px 1px rgba(139, 92, 246, 0.1);
          }
          75% {
            transform: rotate(360deg);
            box-shadow: 0 4px 12px 0 rgba(139, 92, 246, 0.2) inset, 0 8px 18px 0 rgba(124, 58, 237, 0.2) inset, 0 0 4px 1px rgba(139, 92, 246, 0.1);
          }
          100% {
            transform: rotate(450deg);
            box-shadow: 0 4px 12px 0 rgba(139, 92, 246, 0.2) inset, 0 8px 18px 0 rgba(109, 40, 217, 0.2) inset, 0 0 4px 1px rgba(139, 92, 246, 0.1);
          }
        }
        .loader-letter {
          display: inline-block;
          opacity: 0.4;
          transform: translateY(0);
          animation: loader-letter-anim 2.4s infinite;
          z-index: 1;
          white-space: pre-wrap;
        }
        @keyframes loader-letter-anim {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          20% { opacity: 1; text-shadow: rgba(139, 92, 246, 0.5) 0 0 8px; }
          40% { opacity: 0.7; transform: translateY(0); }
        }
      `}} />

      <div className="mb-[48px] relative flex justify-center">
        <div className="loader-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentText}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-center w-full px-[16px] leading-tight"
            >
              <div className="flex flex-wrap items-center justify-center">
                {currentText.split('').map((char, i) => (
                  <span 
                    key={i} 
                    className="loader-letter" 
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="loader-circle"></div>
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-500 text-[14px] mt-[16px]"
      >
        Structuring {numQuestions} questions for the {selectedAgent || "Custom Persona"} profile at {difficulty} difficulty.
      </motion.p>
    </motion.div>
  );
}

  const handleStart = () => {
    if (!jobDescription.trim()) return;
    setStep("processing");
    setTimeout(() => {
      setStep(mode === "text" ? "results" : "video");
    }, 4000);
  };

  const handleResumeUpload = () => {
    setAnalyzingResume(true);
    setTimeout(() => {
      setAnalyzingResume(false);
      setResumeUploaded(true);
      setNewRoleName("Product Designer @ Apple");
      setNewRoleDescription("Design end-to-end user experiences for next-generation hardware and software products. Collaborate with cross-functional teams to drive product vision and user research.");
    }, 2000);
  };

  const getStepIndex = () => {
    if (step === "input") return 0;
    if (step === "processing" || step === "video") return 1;
    return 2; // reveal or results
  };

  const activeIndex = getStepIndex();

  const handleStepClick = (index: number) => {
    if (index === 0) setStep("input");
    if (index === 1 && jobDescription.trim()) setStep(mode === "text" ? "results" : "video"); // Skip processing if going back
    if (index === 2 && jobDescription.trim()) setStep("results");
  };

  return (
    <div className={`w-full ${step === 'dashboard' ? 'max-w-[1200px] mx-auto z-10 relative' : 'fixed inset-0 z-50 bg-[#F8F9FA] flex flex-col font-sans'}`}>
      {step === "dashboard" && (
        <header className="mb-[32px]">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-[16px] mb-[8px]">
              <h1 className="text-[24px] font-semibold text-gray-900 tracking-tight leading-none">Mock Interview</h1>
            </div>
            <p className="text-[14px] text-gray-500">Generate custom mock interview sessions tailored to your target role.</p>
          </motion.div>
        </header>
      )}


      <AnimatePresence mode="wait">
        {step === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="flex justify-between items-end mb-[24px]">
              <div>
                <h2 className="text-[20px] font-semibold text-gray-900">Your Roles</h2>
                <p className="text-[14px] text-gray-500 mt-[4px]">Select a role to view past performance or start a new mock interview.</p>
              </div>
              <Button onClick={() => setStep("idle")} variant="primary" className="gap-[8px]">
                <Plus className="w-[16px] h-[16px]" /> New Mock Interview
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
              {/* Left Column: Roles List (Tabs) */}
              <div className="md:col-span-1 space-y-[12px]">
                {roleHistory.map(r => (
                  <button 
                    key={r.role}
                    onClick={() => setActiveRoleTab(r.role)}
                    className={`w-full text-left p-[16px] rounded-[12px] border transition-all ${activeRoleTab === r.role ? 'bg-purple-50 border-primary-purple shadow-sm' : 'bg-white border-gray-200 hover:border-purple-300'}`}
                  >
                    <h3 className={`font-semibold text-[15px] ${activeRoleTab === r.role ? 'text-primary-purple' : 'text-gray-900'}`}>{r.role}</h3>
                    <p className="text-[12px] text-gray-500 mt-[4px]">Tone: {r.tone}</p>
                  </button>
                ))}
              </div>

              {/* Right Column: Interview Details */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-[12px] shadow-sm border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-200 px-[24px] py-[16px] bg-gray-50">
                    <h3 className="text-[16px] font-semibold text-gray-900">{activeRoleTab} History</h3>
                  </div>
                  <div className="p-[24px]">
                    {roleHistory.find(r => r.role === activeRoleTab)?.interviews.map((interview, idx) => (
                      <div key={idx} className="mb-[16px] last:mb-0 p-[16px] border border-gray-100 rounded-[8px] bg-gray-50">
                        <div className="flex items-center justify-between mb-[8px]">
                          <span className="text-[14px] font-medium text-gray-900">{interview.date}</span>
                          <span className={`px-[8px] py-[2px] rounded-[4px] font-semibold text-[13px] border ${interview.score >= 80 ? 'bg-success-50 text-success-700 border-success-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                            {interview.score}/100
                          </span>
                        </div>
                        <p className="text-[13px] text-gray-600 mb-[12px]">{interview.insight}</p>
                        <button className="text-[13px] text-primary-purple font-medium hover:text-purple-700">View Detailed Analysis →</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step !== "dashboard" && (
          <div className="flex flex-col h-full w-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-[24px] py-[16px] bg-white border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-[16px]">
                <button onClick={() => setStep('dashboard')} className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-gray-100 border border-gray-200 transition-colors">
                  <ArrowLeft className="w-[18px] h-[18px] text-gray-600" />
                </button>
                <h1 className="text-[20px] font-bold text-gray-900">Product Design at Google</h1>
              </div>
            </div>

            <div className="flex-1 p-[24px] grid grid-cols-1 lg:grid-cols-12 gap-[24px] overflow-hidden">
              {/* Left Column */}
              {step !== "video" && (
                <div className="lg:col-span-4 flex flex-col gap-[24px] h-full overflow-y-auto pb-[24px]">


                {/* Form */}
                <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 flex-1 flex flex-col p-[24px]">
                  <h2 className="text-[14px] font-bold text-gray-900 mb-[24px]">Interview Context</h2>
                  
                  <div className="space-y-[20px] flex-1">
                    <div className="grid grid-cols-[110px_1fr] items-center gap-[16px]">
                      <Label className="text-[13px] text-gray-600 font-medium">Custom Role</Label>
                      <div className="relative">
                        <select 
                          value={selectedAgent} 
                          onChange={(e) => {
                            if (e.target.value === "new") {
                              setIsCreateModalOpen(true);
                            } else {
                              setSelectedAgent(e.target.value);
                            }
                          }} 
                          className="appearance-none w-full h-[40px] rounded-[8px] border border-gray-200 px-[12px] pr-[32px] text-[13px] text-gray-900 focus:outline-none focus:border-primary-purple transition-colors bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
                        >
                          <option value="Alex (Senior Dev)">Alex (Senior Dev)</option>
                          <option value="Manager Persona">Manager Persona</option>
                          <option value="new">+ Create New Role</option>
                        </select>
                        <ChevronDown className="w-[14px] h-[14px] text-gray-400 absolute right-[12px] top-[13px] pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[110px_1fr] items-center gap-[16px]">
                      <Label className="text-[13px] text-gray-600 font-medium">Mode</Label>
                      <div className="flex bg-gray-50 p-[4px] rounded-[8px] border border-gray-200">
                        <button
                          onClick={() => setMode("text")}
                          className={`flex-1 flex items-center justify-center gap-[6px] py-[6px] text-[13px] font-medium rounded-[6px] transition-all ${mode === "text" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          <Type className="w-[14px] h-[14px]" /> Text
                        </button>
                        <button
                          onClick={() => setMode("video")}
                          className={`flex-1 flex items-center justify-center gap-[6px] py-[6px] text-[13px] font-medium rounded-[6px] transition-all ${mode === "video" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                        >
                          <Video className="w-[14px] h-[14px]" /> Video
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-[110px_1fr] items-center gap-[16px]">
                      <Label className="text-[13px] text-gray-600 font-medium">Difficulty</Label>
                      <div className="relative">
                        <select 
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="appearance-none w-full h-[40px] rounded-[8px] border border-gray-200 px-[12px] pr-[32px] text-[13px] text-gray-900 focus:outline-none focus:border-primary-purple transition-colors bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
                        >
                          <option value="Adaptive (Easy to Hard)">Adaptive</option>
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                        <ChevronDown className="w-[14px] h-[14px] text-gray-400 absolute right-[12px] top-[13px] pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[110px_1fr] items-center gap-[16px]">
                      <Label className="text-[13px] text-gray-600 font-medium">Questions</Label>
                      <div className="relative">
                        <select 
                          value={numQuestions}
                          onChange={(e) => setNumQuestions(e.target.value)}
                          className="appearance-none w-full h-[40px] rounded-[8px] border border-gray-200 px-[12px] pr-[32px] text-[13px] text-gray-900 focus:outline-none focus:border-primary-purple transition-colors bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
                        >
                          <option value="5">5 Questions</option>
                          <option value="10">10 Questions</option>
                          <option value="15">15 Questions</option>
                        </select>
                        <ChevronDown className="w-[14px] h-[14px] text-gray-400 absolute right-[12px] top-[13px] pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[110px_1fr] items-start gap-[16px]">
                      <Label className="text-[13px] text-gray-600 font-medium pt-[12px]">Job Description</Label>
                      <Textarea 
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste JD to tailor questions..."
                        className="w-full min-h-[100px] rounded-[8px] border border-gray-200 p-[12px] text-[13px] resize-none focus:outline-none focus:border-primary-purple bg-white shadow-sm"
                      />
                    </div>


                  </div>

                  <div className="mt-[32px]">
                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStart} 
                      className="w-full relative overflow-hidden rounded-[12px] p-[2px] group transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-purple via-purple-400 to-primary-purple opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundSize: '200% auto' }} />
                      <div className="relative bg-[#1A1A1A] group-hover:bg-black text-white rounded-[10px] py-[16px] flex flex-wrap items-center justify-center sm:justify-between px-[16px] h-full w-full transition-colors shadow-md gap-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[28px] h-[28px] bg-primary-purple rounded-[8px] flex items-center justify-center text-[14px] font-bold shadow-sm">
                            <Sparkles className="w-[14px] h-[14px]" />
                          </div>
                          <span className="font-semibold text-[15px] whitespace-nowrap">Start Practice Session</span>
                        </div>
                        <div className="flex items-center gap-[6px] bg-white/10 border border-white/10 px-[12px] py-[6px] rounded-full text-[12px] font-medium backdrop-blur-md whitespace-nowrap">
                          <Check className="w-[14px] h-[14px]" /> Auto-saved
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
              )}

              {/* Right Column */}
              <div className={`bg-white rounded-[16px] shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden ${step === 'video' ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
                {step !== "video" && (
                  <div className="px-[24px] py-[20px] border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-[12px]">
                      <h2 className="text-[16px] font-bold text-gray-900">Synapse AI</h2>
                      <div className="px-[8px] py-[4px] bg-[#E6F4EA] text-[#137333] rounded-[6px] text-[11px] font-bold uppercase tracking-wider flex items-center gap-[4px]">
                        <div className="w-[6px] h-[6px] rounded-full bg-[#137333] animate-pulse" /> Ready
                      </div>
                    </div>
                    <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] hover:bg-gray-100 text-gray-500 transition-colors">
                      <Maximize2 className="w-[16px] h-[16px]" />
                    </button>
                  </div>
                )}
                
                <div className={`flex-1 overflow-y-auto bg-white ${step === 'video' ? 'p-[0px]' : 'p-[32px]'}`}>
                  <AnimatePresence mode="wait">
                    {step === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-center"
                      >
                        <div className="w-[120px] h-[120px] flex items-center justify-center mb-[24px] relative">
                          <StandaloneMascot />
                        </div>
                        <h3 className="text-[18px] font-semibold text-gray-900 mb-[8px]">Synapse AI is Ready</h3>
                        <p className="text-[14px] text-gray-500 max-w-[320px]">
                          Configure your interview context on the left and launch Synapse AI to begin receiving real-time assistance.
                        </p>
                      </motion.div>
                    )}

        {step === "processing" && (
          <ProcessingScreen numQuestions={numQuestions} selectedAgent={selectedAgent} difficulty={difficulty} />
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-[24px]"
          >
            <div className="flex items-center justify-between mb-[32px]">
              <div>
                <h2 className="text-[24px] font-semibold text-gray-900">Your Interview Prep</h2>
                <p className="text-gray-500 text-[14px] mt-[4px]">Review these potential questions and model answers.</p>
              </div>
              <div className="flex items-center gap-[12px]">
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    if (hasCompletedVideoMock) {
                      setHasCompletedVideoMock(false);
                      setSelectedQuestionIds([]);
                    } else {
                      setStep("input");
                    }
                  }}
                >
                  {hasCompletedVideoMock ? "Back to Questions" : "Start Over"}
                </Button>
                {hasCompletedVideoMock && (
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      setStep("video");
                    }} 
                    className="gap-[8px]"
                  >
                    <Video className="w-[16px] h-[16px]" /> Retake Interview
                  </Button>
                )}
                {!hasCompletedVideoMock && (
                  <Button variant="primary" onClick={() => setStep("video")} className="gap-[8px]">
                    <Video className="w-[16px] h-[16px]" /> Practice Mock Video
                  </Button>
                )}
              </div>
            </div>


            {/* Detailed Performance Analysis */}
            {hasCompletedVideoMock && (
              <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm overflow-hidden mb-[32px]">
              <div className="border-b border-gray-200 px-[24px] py-[20px] bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-semibold text-gray-900 flex items-center gap-[8px]">
                    <TrendingUp className="w-[20px] h-[20px] text-primary-purple" />
                    Deep Performance Analysis
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-[4px]">A comprehensive breakdown of your mock interview performance.</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider mb-[2px]">Overall Score</span>
                  <div className={`text-[32px] font-bold leading-none ${mockScore >= 80 ? 'text-success-600' : 'text-orange-500'}`}>
                    {mockScore}/100
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="p-[24px] space-y-[16px]">
                  <h4 className="text-[15px] font-semibold text-gray-900 flex items-center gap-[8px]">
                    <CheckCircle2 className="w-[18px] h-[18px] text-success-500" />
                    What Went Well
                  </h4>
                  <ul className="space-y-[12px]">
                    <li className="flex items-start gap-[8px]">
                      <div className="w-[6px] h-[6px] rounded-full bg-success-500 mt-[7px] shrink-0" />
                      <p className="text-[14px] text-gray-700 leading-relaxed">
                        <strong className="text-gray-900 font-medium block">STAR Method Consistency</strong>
                        You structured 8/10 answers perfectly using Situation, Task, Action, Result, making your impact extremely clear.
                      </p>
                    </li>
                    <li className="flex items-start gap-[8px]">
                      <div className="w-[6px] h-[6px] rounded-full bg-success-500 mt-[7px] shrink-0" />
                      <p className="text-[14px] text-gray-700 leading-relaxed">
                        <strong className="text-gray-900 font-medium block">Technical Depth</strong>
                        When pressed on system architecture, you provided excellent specific examples rather than high-level platitudes.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="p-[24px] space-y-[16px]">
                  <h4 className="text-[15px] font-semibold text-gray-900 flex items-center gap-[8px]">
                    <AlertTriangle className="w-[18px] h-[18px] text-orange-500" />
                    Areas to Improve
                  </h4>
                  <ul className="space-y-[12px]">
                    <li className="flex items-start gap-[8px]">
                      <div className="w-[6px] h-[6px] rounded-full bg-orange-500 mt-[7px] shrink-0" />
                      <p className="text-[14px] text-gray-700 leading-relaxed">
                        <strong className="text-gray-900 font-medium block">Over-explaining Context</strong>
                        In question 3, you spent 2 minutes setting up the "Situation". Try to condense context to 30 seconds and focus more on "Action" and "Result".
                      </p>
                    </li>
                    <li className="flex items-start gap-[8px]">
                      <div className="w-[6px] h-[6px] rounded-full bg-orange-500 mt-[7px] shrink-0" />
                      <p className="text-[14px] text-gray-700 leading-relaxed">
                        <strong className="text-gray-900 font-medium block">Filler Words</strong>
                        You used "like" and "basically" 14 times. Taking a brief pause instead of using a filler word projects more confidence.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 p-[24px] bg-purple-50">
                <h4 className="text-[15px] font-semibold text-primary-purple flex items-center gap-[8px] mb-[12px]">
                  <UserCheck className="w-[18px] h-[18px]" />
                  Tone & Delivery Analysis
                </h4>
                <div className="flex flex-col md:flex-row gap-[16px] items-center">
                  <p className="text-[14px] text-gray-700 leading-relaxed flex-1">
                    Your delivery mapped well to your requested <strong>"{inferredTones.join(', ')}"</strong> profile. 
                    You sounded highly authentic and natural. However, when answering the "conflict resolution" question, your tone became defensive. Remember to maintain a collaborative tone even when discussing difficult stakeholders.
                  </p>
                  <div className="flex gap-[8px] shrink-0">
                    <span className="px-[12px] py-[4px] rounded-full bg-white border border-purple-200 text-primary-purple text-[12px] font-medium shadow-sm">Highly Collaborative</span>
                    <span className="px-[12px] py-[4px] rounded-full bg-white border border-purple-200 text-primary-purple text-[12px] font-medium shadow-sm">Direct & Concise</span>
                  </div>
                </div>
              </div>
              </div>
            )}

            {selectedQuestionIds.length > 0 && !hasCompletedVideoMock && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-purple-50 rounded-[12px] p-[16px] border border-purple-100 flex items-center justify-between shadow-sm sticky top-[16px] z-10"
              >
                <div className="flex items-center gap-[12px]">
                  <Badge variant="purple" className="text-[13px] px-[8px] py-[2px]">{selectedQuestionIds.length} Selected</Badge>
                  <span className="text-[13px] text-gray-700 font-medium">Ready for practice or saving to your library.</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <Button variant="secondary" className="h-[36px] text-[13px]">
                    <Plus className="w-[16px] h-[16px] mr-[6px]" /> Add to Question Bank
                  </Button>
                  <Button variant="primary" onClick={() => setStep("video")} className="h-[36px] text-[13px]">
                    <Video className="w-[16px] h-[16px] mr-[6px]" /> Practice Selected
                  </Button>
                </div>
              </motion.div>
            )}

            {!hasCompletedVideoMock && selectedQuestionIds.length > 0 && (
              <div className="flex items-center gap-[16px] mb-[16px] px-[8px]">
                <div className="flex items-center gap-[8px]">
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={selectedQuestionIds.length === mockQuestions.length && mockQuestions.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuestionIds(mockQuestions.map(q => q.id));
                      } else {
                        setSelectedQuestionIds([]);
                      }
                    }}
                    className="w-[16px] h-[16px] rounded-[4px] border-gray-300 text-primary-purple focus:ring-primary-purple cursor-pointer"
                  />
                  <label htmlFor="selectAll" className="text-[13px] text-gray-600 font-medium cursor-pointer select-none">
                    {selectedQuestionIds.length === mockQuestions.length && mockQuestions.length > 0 ? "Deselect All" : "Select All"}
                  </label>
                </div>

                {selectedQuestionIds.length > 0 && selectedQuestionIds.length < mockQuestions.length && (
                  <>
                    <div className="w-[1px] h-[14px] bg-gray-300" />
                    <button 
                      onClick={() => setSelectedQuestionIds([])}
                      className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Clear
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="space-y-[24px]">
              {mockQuestions.map((q, i) => (
                <QuestionCard 
                  key={q.id} 
                  question={q} 
                  index={i} 
                  mode={hasCompletedVideoMock ? "feedback" : "prep"} 
                  selectable={!hasCompletedVideoMock}
                  isSelected={selectedQuestionIds.includes(q.id)}
                  onToggleSelect={() => {
                    setSelectedQuestionIds(prev => 
                      prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id]
                    );
                  }}
                />
              ))}
            </div>

            {!hasCompletedVideoMock && (
              <div className="flex justify-center pt-[16px]">
                <Button variant="secondary" className="border-dashed border-gray-300 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 shadow-sm h-[44px]">
                  <Sparkles className="w-[16px] h-[16px] mr-[8px]" /> Generate More Questions
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {step === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[12px] shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between px-[32px] py-[20px] border-b border-gray-200">
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <Sparkles className="w-[20px] h-[20px] text-primary-purple" />
                  <span className="text-[18px] font-semibold text-gray-900">Active Practice Session</span>
                </div>
              </div>
              <div className="flex items-center gap-[20px]">
                <div className="flex items-center gap-[12px] bg-gray-50 px-[16px] py-[8px] rounded-full border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-[8px] text-[14px] font-medium text-gray-700">
                    <Clock className="w-[16px] h-[16px] text-gray-400" />
                    Time Left
                  </div>
                  <div className="flex gap-[4px] opacity-80">
                    <div className="h-[4px] w-[16px] bg-success-500 rounded-full" />
                    <div className="h-[4px] w-[16px] bg-success-500 rounded-full" />
                    <div className="h-[4px] w-[16px] bg-success-500 rounded-full" />
                  </div>
                  <span className="text-[16px] font-bold text-gray-900 font-mono tracking-tight">05:13</span>
                </div>
              </div>
            </div>

            <div className="p-[32px] grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
              {/* Left Video Feed */}
              <div className="lg:col-span-2 relative aspect-video bg-gray-900 rounded-[16px] overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                  alt="User feed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-[16px] left-[16px] text-white text-[14px] font-medium drop-shadow-md">
                  You
                </div>
                <div className="absolute top-[16px] right-[16px] bg-white text-red-500 px-[10px] py-[4px] rounded-[6px] text-[12px] font-bold flex items-center gap-[6px] shadow-sm">
                  <div className="w-[8px] h-[8px] rounded-full bg-red-500 animate-pulse" /> Rec
                </div>
                <div className="absolute bottom-[16px] left-[16px] w-[32px] h-[32px] rounded-full bg-success-500/20 backdrop-blur-md flex items-center justify-center text-success-500">
                  <div className="flex items-end gap-[2px] h-[12px]">
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: ["4px", `${Math.random() * 8 + 4}px`, "4px"] }}
                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                        className="w-[2px] bg-success-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex flex-col gap-[24px] h-full">
                {/* Question Card */}
                <div className="bg-white rounded-[16px] p-[24px] border border-gray-200 shadow-sm flex flex-col justify-center min-h-[160px]">
                  <div className="flex items-center justify-between mb-[16px]">
                    <div className="flex items-center gap-[8px] text-[14px] font-bold text-gray-900">
                      <div className="w-[20px] h-[20px] bg-gray-900 text-white rounded-[4px] flex items-center justify-center text-[12px]">?</div>
                      Question 1 of 10
                    </div>
                    <button className="w-[28px] h-[28px] rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    </button>
                  </div>
                  <p className="text-[15px] text-gray-800 leading-relaxed font-medium">
                    {mockQuestions[0].question}
                  </p>
                </div>

                {/* AI Interviewer Card */}
                <div className="bg-gradient-to-b from-[#f0fdf4] to-white rounded-[16px] p-[24px] flex-1 border border-success-200 flex flex-col relative overflow-hidden shadow-sm min-h-[220px]">
                  <div className="text-[14px] font-bold text-gray-900 mb-[16px]">AI Interviewer</div>
                  <div className="flex-1 flex items-center justify-center pb-[24px]">
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(34,197,94,0)", "0 0 40px 10px rgba(34,197,94,0.4)", "0 0 0 0 rgba(34,197,94,0)"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-green-300 to-green-500 shadow-lg flex items-center justify-center relative"
                    >
                      <span className="text-white text-[32px] font-bold tracking-tight drop-shadow-md">C</span>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-[20px] left-[20px] w-[32px] h-[32px] rounded-full bg-success-500/20 flex items-center justify-center text-success-500">
                    <div className="flex items-end gap-[2px] h-[12px]">
                      {[1, 2, 3].map((i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: ["4px", `${Math.random() * 8 + 4}px`, "4px"] }}
                          transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                          className="w-[2px] bg-success-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pb-[24px] flex items-center justify-center gap-[16px]">
              <button onClick={() => { setMockScore(38); setHasCompletedVideoMock(true); setStep("reveal"); }} className="w-[48px] h-[48px] rounded-full border border-gray-300 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors" title="End Session">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.66 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5.34"></path><polygon points="18 16 22 12 18 8 18 11 10 11 10 13 18 13 18 16"></polygon></svg>
              </button>
              <button className="w-[48px] h-[48px] rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors" title="Toggle Camera">
                <Video className="w-[20px] h-[20px]" />
              </button>
              <button className="w-[48px] h-[48px] rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors" title="Toggle Microphone">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              </button>
              <Button onClick={() => { setMockScore(91); setHasCompletedVideoMock(true); setStep("reveal"); }} variant="primary" className="h-[48px] rounded-full px-[24px]">
                Next Question <svg className="w-[16px] h-[16px] ml-[8px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Button>
            </div>
          </motion.div>
        )}

        {step === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ConfidenceReveal 
              score={mockScore} 
              onComplete={() => setStep("results")} 
              onRetry={() => setStep("video")} 
            />
          </motion.div>
        )}
      </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
      )}
    </AnimatePresence>

      {/* Create New Role Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[12px] w-[500px] max-w-[90vw] shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-[20px] py-[16px] border-b border-gray-100">
              <h3 className="text-[16px] font-semibold text-gray-900">Create New Role</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors w-[28px] h-[28px] flex items-center justify-center rounded-full hover:bg-gray-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-[20px] flex-1 overflow-y-auto space-y-[16px]">
              <div>
                <div className="flex items-center justify-between mb-[8px]">
                  <Label className="text-[13px] text-gray-900 font-bold">Resume*</Label>
                  {resumeUploaded && <span className="text-[12px] text-success-600 font-medium flex items-center gap-[4px]"><Check className="w-[14px] h-[14px]" /> Profile inferred</span>}
                </div>
                {!resumeUploaded ? (
                  <button 
                    type="button"
                    onClick={handleResumeUpload}
                    disabled={analyzingResume}
                    className="w-full flex flex-col items-center justify-center gap-[4px] py-[24px] border-2 border-dashed border-primary-purple rounded-[8px] bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    {analyzingResume ? (
                      <>
                        <Loader2 className="w-[24px] h-[24px] text-primary-purple animate-spin mb-[4px]" />
                        <span className="text-[13px] font-medium text-purple-900">Scanning your resume...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-[24px] h-[24px] text-primary-purple mb-[4px]" />
                        <span className="text-[13px] font-medium text-purple-900">Upload your resume (PDF)</span>
                        <span className="text-[12px] text-purple-700">We'll infer your profile and ideal tone.</span>
                      </>
                    )}
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-purple-50 rounded-[8px] p-[16px] border border-purple-100"
                  >
                    <div className="flex items-center gap-[12px] mb-[12px]">
                      <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-primary-purple shadow-sm">
                        <FileText className="w-[16px] h-[16px]" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-gray-900">zoe_resume_2025.pdf</div>
                        <div className="text-[12px] text-gray-500">Profile successfully parsed.</div>
                      </div>
                    </div>
                    <div className="space-y-[12px] pt-[8px]">
                      <Label className="text-primary-purple text-[13px] font-semibold">Detected Authentic Tones</Label>
                      <div className="flex flex-wrap gap-[8px] items-center">
                        {toneLibrary.map(tone => {
                          const isSelected = inferredTones.includes(tone);
                          return (
                            <button
                              key={tone}
                              onClick={() => toggleTone(tone)}
                              className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium transition-colors border flex items-center gap-[4px] ${
                                isSelected 
                                  ? 'bg-primary-purple text-white border-primary-purple hover:bg-purple-700' 
                                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {tone}
                              {isSelected ? <span className="text-[10px] opacity-70">✕</span> : <span className="text-[10px] opacity-70">+</span>}
                            </button>
                          );
                        })}
                        <input 
                          type="text"
                          value={customToneInput}
                          onChange={(e) => setCustomToneInput(e.target.value)}
                          onKeyDown={handleAddCustomTone}
                          placeholder="+ Add custom tone..."
                          className="px-[12px] py-[4px] rounded-full text-[12px] font-medium border border-dashed border-purple-300 bg-transparent text-purple-700 placeholder:text-purple-400 focus:outline-none focus:border-primary-purple focus:bg-white w-[140px] transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div>
                <Label className="text-[13px] text-gray-900 font-bold mb-[8px] block">Role name*</Label>
                <input 
                  type="text" 
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Product Manager @ Google" 
                  className="w-full h-[40px] rounded-[8px] border border-gray-200 px-[12px] text-[13px] text-gray-900 focus:outline-none focus:border-primary-purple transition-colors shadow-sm" 
                />
              </div>

              <div>
                <Label className="text-[13px] text-gray-900 font-bold mb-[8px] block">Role description</Label>
                <Textarea 
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                  placeholder="Paste the link here for more accurate answers" 
                  className="w-full min-h-[100px] rounded-[8px] border border-gray-200 p-[12px] text-[13px] resize-none focus:outline-none focus:border-primary-purple shadow-sm placeholder:text-gray-400" 
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-[12px] px-[20px] py-[16px]">
              <button onClick={() => setIsCreateModalOpen(false)} className="px-[20px] py-[10px] rounded-[8px] border border-gray-200 text-gray-700 text-[13px] font-semibold hover:bg-gray-50 transition-colors bg-white shadow-sm">Cancel</button>
              <button onClick={() => { setIsCreateModalOpen(false); setSelectedAgent("Product Manager"); }} className="px-[20px] py-[10px] rounded-[8px] bg-[#0f172a] text-white text-[13px] font-semibold hover:bg-black transition-colors shadow-sm">Create</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
