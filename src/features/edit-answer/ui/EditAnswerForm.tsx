"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";

interface EditAnswerFormProps {
  onCancel: () => void;
  onSuccess: (newAnswer: string, newReasoning?: string) => void;
}

export function EditAnswerForm({ onCancel, onSuccess }: EditAnswerFormProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tones = ["Conversational", "Technical", "Executive", "Humble"];

  const mockAnswers = [
    {
      text: "I address technical debt discussions as a collaborative negotiation rather than a zero-sum game. I always start by quantifying the business risk of the debt—such as an impending system bottleneck—and present it alongside the PM's feature request. My goal is to find a pragmatic compromise.",
      reasoning: "This revision works better because it directly adopts your preferred tone while maintaining a strong STAR format. It removes the corporate jargon and replaces it with the authentic, direct communication style you specified."
    },
    {
      text: "Whenever I have competing priorities, I rely on a structured approach. I usually pull the PM into a quick sync, lay out the current roadmap, and transparently discuss trade-offs. By focusing on data-driven ROI for both the feature and the technical health, we usually land on a balanced sprint plan easily.",
      reasoning: "This version heavily leans into the 'Conversational' and 'Collaborative' tone constraints. It feels much more natural and less scripted, emphasizing teamwork and communication over rigid frameworks."
    },
    {
      text: "To be blunt, I don't believe in prioritizing features over stability. If a system is at risk of falling over due to tech debt, that becomes my #1 priority. I explain the financial risk of downtime to the PM in clear terms. Usually, when presented with the bottom-line impact, they agree to delay the feature by a sprint.",
      reasoning: "This is a much more 'Direct' and 'Executive' spin. It shows strong technical leadership and an uncompromising stance on platform stability, mapped directly to business value and risk management."
    }
  ];

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const randomMock = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
      setIsSubmitting(false);
      onSuccess(randomMock.text, randomMock.reasoning);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="pt-[16px] mt-[16px] border-t border-gray-200"
    >
      <div className="mb-[12px] flex items-center justify-between">
        <Label>Quick Tone Shift:</Label>
        <div className="flex gap-[8px]">
          {tones.map(tone => {
            const isSelected = selectedTones.includes(tone);
            return (
              <button
                key={tone}
                type="button"
                onClick={() => setSelectedTones(prev => 
                  isSelected ? prev.filter(t => t !== tone) : [...prev, tone]
                )}
                className={`px-[12px] py-[4px] rounded-full text-[12px] font-medium transition-colors border ${
                  isSelected 
                    ? 'bg-purple-100 border-primary-purple text-primary-purple' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tone}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mb-[12px]">
        <Label>Or give specific direction:</Label>
      </div>
      <Textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. 'I wouldn't use the word utilize, make it more conversational' or 'I actually used Jira for this...'"
        className="mb-[12px] min-h-[80px]"
        disabled={isSubmitting}
      />
      <div className="flex items-center gap-[8px] justify-end">
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="w-[16px] h-[16px] mr-[8px] animate-spin" /> : <RefreshCcw className="w-[16px] h-[16px] mr-[8px]" />}
          {isSubmitting ? "Restructuring answer..." : "Revise Answer"}
        </Button>
      </div>
    </motion.div>
  );
}
