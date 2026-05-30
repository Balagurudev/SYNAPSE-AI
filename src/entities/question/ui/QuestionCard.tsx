"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Lightbulb } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { InterviewQuestion } from "../model/types";
import { EditAnswerForm } from "@/features/edit-answer/ui/EditAnswerForm";

interface QuestionCardProps {
  question: InterviewQuestion;
  index: number;
  mode?: "prep" | "feedback";
  selectable?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

export function QuestionCard({ question: initialQuestion, index, mode = "prep", selectable = false, isSelected = false, onToggleSelect }: QuestionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(initialQuestion);
  const [showReasoning, setShowReasoning] = useState(false);

  const getDifficultyVariant = (diff: string) => {
    if (diff === "Hard") return "purple";
    if (diff === "Medium") return "gray";
    return "success";
  };

  const handleEditSuccess = (newAnswer: string, newReasoning?: string) => {
    setQuestion(prev => ({ ...prev, answer: newAnswer, reasoning: newReasoning || prev.reasoning }));
    setShowReasoning(true); // Auto-open reasoning after a successful edit
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => selectable && onToggleSelect?.()}
      className={`p-[24px] rounded-[12px] shadow-sm border transition-all duration-200 ${
        selectable ? 'cursor-pointer hover:border-purple-300 hover:shadow-md' : ''
      } ${
        isSelected 
          ? 'border-primary-purple bg-purple-50/30 ring-1 ring-primary-purple' 
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-[16px] mb-[16px]">
        <div className="flex items-start gap-[12px]">
          {selectable && (
            <div className="pt-[4px]">
              <input 
                type="checkbox" 
                checked={isSelected}
                readOnly
                className="w-[18px] h-[18px] rounded-[4px] border-gray-300 text-primary-purple focus:ring-primary-purple pointer-events-none"
              />
            </div>
          )}
          <h4 className="text-[16px] font-semibold text-gray-900 leading-snug">{question.question}</h4>
        </div>
        <Badge variant={getDifficultyVariant(question.difficulty)}>
          {question.difficulty}
        </Badge>
      </div>
      
      {mode === "feedback" ? (
        <div className="mt-[16px] space-y-[16px]">
          <div className="bg-gray-50 rounded-[8px] p-[16px] border border-gray-200">
            <h5 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-[12px]">Your Answer Transcript</h5>
            {index === 0 ? (
              <div className="text-[15px] text-gray-800 leading-[1.8]">
                In my previous role, I frequently managed overlapping project launches. I utilized an Eisenhower Matrix to categorize tasks by urgency and importance, ensuring critical paths were <span className="group relative cursor-help bg-red-100 text-red-900 px-[2px] rounded-[2px] border-b border-red-300 transition-colors hover:bg-red-200">
                  unblocked
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[8px] w-[200px] p-[12px] bg-gray-900 text-white text-[12px] leading-relaxed rounded-[8px] shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 font-sans normal-case">
                    <strong className="text-red-400 block mb-[4px]">Mumbled Word</strong>
                    The audio dropped here. Enunciate clearly, especially on high-impact verbs like "unblocked".
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </span>. By communicating transparently with <span className="group relative cursor-help decoration-purple-400 decoration-wavy underline underline-offset-4">
                  stakeholders about realistic timelines
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[8px] w-[240px] p-[12px] bg-gray-900 text-white text-[12px] leading-relaxed rounded-[8px] shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 font-sans normal-case">
                    <strong className="text-purple-400 block mb-[4px]">Wordy Phrasing</strong>
                    This sounds a bit corporate. To align with your "Conversational" tone, try: "By setting realistic timelines with stakeholders..."
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </span>, I successfully delivered 3 concurrent projects 
                <span className="group relative inline-flex items-center mx-[4px] align-middle cursor-help">
                  <span className="bg-yellow-200 text-yellow-800 px-[4px] py-[1px] rounded-[2px] text-[10px] font-bold tracking-widest mr-[4px]">↔</span>
                  <span className="bg-gray-200 text-gray-600 px-[4px] py-[1px] rounded-[2px] text-[10px] font-medium">[missing break]</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[8px] w-[220px] p-[12px] bg-gray-900 text-white text-[12px] leading-relaxed rounded-[8px] shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 font-sans normal-case text-left whitespace-normal">
                    <strong className="text-yellow-400 block mb-[4px]">Pacing Issue</strong>
                    You rushed into the result without a pause. Take a half-second breath here to let your previous point land confidently.
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </span>
                without sacrificing quality.
              </div>
            ) : (
              <div className="text-[15px] text-gray-800 leading-[1.8]">
                {question.answer}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 rounded-[8px] p-[16px] text-[14px] leading-relaxed text-gray-700 border border-gray-200">
            {question.answer}
          </div>

          {question.reasoning && (
            <div className="mt-[16px]">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReasoning(!showReasoning);
                }}
                className="flex items-center gap-[6px] text-[13px] font-medium text-primary-purple hover:text-purple-700 transition-colors"
              >
                <Lightbulb className="w-[14px] h-[14px]" />
                {showReasoning ? "Hide reasoning" : "Why this works"}
              </button>
              
              <motion.div 
                initial={false}
                animate={{ height: showReasoning ? "auto" : 0, opacity: showReasoning ? 1 : 0, marginTop: showReasoning ? 12 : 0 }}
                className="overflow-hidden"
              >
                <div className="bg-purple-50 rounded-[8px] p-[16px] text-[14px] leading-relaxed text-primary-purple border border-purple-100">
                  {question.reasoning}
                </div>
              </motion.div>
            </div>
          )}

          {isEditing ? (
            <EditAnswerForm 
              onCancel={() => setIsEditing(false)} 
              onSuccess={handleEditSuccess} 
            />
          ) : (
            <div className="flex justify-end pt-[12px]">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }} 
                className="text-gray-500 hover:text-gray-900"
              >
                <AlertCircle className="w-[16px] h-[16px] mr-[8px]" /> Doesn't sound like me?
              </Button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
