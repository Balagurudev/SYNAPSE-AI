"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Upload, User, Settings, CheckCircle2, FileText, Bot, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";

interface CustomRole {
  id: string;
  role: string;
  tone: string;
  resumeFile: string;
  history?: { date: string, score: number }[];
}

export function EmployeeHub() {
  const [roles, setRoles] = useState<CustomRole[]>([
    {
      id: "1",
      role: "Senior Frontend Engineer",
      tone: "Technical & Analytical",
      resumeFile: "alex_resume_v2.pdf",
      history: [
        { date: "Oct 12, 2026", score: 91 },
        { date: "Oct 10, 2026", score: 78 }
      ]
    }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState({ role: "", tone: "", resumeFile: "" });
  const [analyzingResume, setAnalyzingResume] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleResumeUpload = () => {
    setAnalyzingResume(true);
    setTimeout(() => {
      setAnalyzingResume(false);
      setResumeUploaded(true);
      setNewRole({ 
        role: "Product Manager", 
        tone: "Executive & Strategic", 
        resumeFile: "resume_2026.pdf" 
      });
    }, 2000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setRoles([...roles, { ...newRole, id: Date.now().toString(), resumeFile: newRole.resumeFile || "uploaded_resume.pdf" }]);
    setIsCreating(false);
    setNewRole({ role: "", tone: "", resumeFile: "" });
    setResumeUploaded(false);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <header className="mb-[32px] flex items-end justify-between">
        <div>
          <h1 className="text-[30px] font-semibold text-gray-900 tracking-tight">Employee Hub</h1>
          <p className="text-[14px] text-gray-500 mt-[8px]">Build custom roles trained on your specific resumes and preferred tone.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="w-[16px] h-[16px] mr-[8px]" /> New Role
        </Button>
      </header>

      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-[32px] overflow-hidden"
          >
            <div className="bg-white p-[32px] rounded-[12px] border border-gray-200 shadow-sm">
              <h2 className="text-[18px] font-semibold text-gray-900 mb-[24px]">Create Custom Role</h2>
              <form onSubmit={handleCreate} className="space-y-[24px]">
                {!resumeUploaded ? (
                  <div className="space-y-[8px]">
                    <Label>Upload Resume to Create Role</Label>
                    <button 
                      type="button"
                      onClick={handleResumeUpload}
                      disabled={analyzingResume}
                      className="w-full flex flex-col items-center justify-center gap-[8px] py-[32px] border-2 border-dashed border-primary-purple rounded-[8px] bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                    >
                      {analyzingResume ? (
                        <>
                          <Loader2 className="w-[24px] h-[24px] text-primary-purple animate-spin" />
                          <span className="text-[14px] font-medium text-purple-900">Scanning your resume...</span>
                          <span className="text-[12px] text-purple-700">Extracting past experience to map your authentic tone profile.</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-[24px] h-[24px] text-primary-purple" />
                          <span className="text-[14px] font-medium text-purple-900">Click to upload your resume (PDF)</span>
                          <span className="text-[12px] text-purple-700">We'll automatically infer your target role and ideal tone.</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-[24px]"
                  >
                    <div className="bg-purple-50 rounded-[8px] p-[16px] border border-purple-100 flex items-center justify-between">
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-primary-purple shadow-sm">
                          <FileText className="w-[16px] h-[16px]" />
                        </div>
                        <div>
                          <div className="text-[14px] font-semibold text-gray-900">{newRole.resumeFile}</div>
                          <div className="text-[12px] text-gray-500">Profile successfully parsed.</div>
                        </div>
                      </div>
                      <span className="text-[12px] text-success-600 font-medium">✓ Inferred</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                      <div className="space-y-[8px]">
                        <Label htmlFor="targetRole">Inferred Target Role</Label>
                        <Input id="targetRole" value={newRole.role} onChange={(e) => setNewRole({...newRole, role: e.target.value})} placeholder="e.g. Product Manager" required />
                      </div>
                      <div className="space-y-[8px]">
                        <Label htmlFor="tone">Inferred Tone Profile</Label>
                        <Input 
                          id="tone" 
                          value={newRole.tone} 
                          onChange={(e) => setNewRole({...newRole, tone: e.target.value})} 
                          placeholder="e.g. Technical, analytical, and highly structured" 
                          required 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end gap-[12px] pt-[16px] border-t border-gray-100">
                  <Button variant="ghost" type="button" onClick={() => { setIsCreating(false); setResumeUploaded(false); }}>Cancel</Button>
                  <Button type="submit" variant="primary" disabled={!resumeUploaded}>Save Role</Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {roles.map((roleItem) => (
          <motion.div 
            key={roleItem.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-[24px] rounded-[12px] border border-gray-200 shadow-sm flex flex-col items-start relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-primary-purple to-purple-400" />
            <div className="flex items-center justify-between w-full mb-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-[8px] bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Bot className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-gray-900 leading-tight">{roleItem.role}</h3>
                  <p className="text-[12px] text-gray-500">Custom Interview Role</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-[32px] w-[32px]">
                <Settings className="w-[16px] h-[16px]" />
              </Button>
            </div>
            
            <div className="space-y-[12px] w-full mt-[8px] flex-1">
              <div className="flex items-center justify-between py-[8px] border-b border-gray-100">
                <span className="text-[12px] text-gray-500 flex items-center gap-[6px]"><FileText className="w-[14px] h-[14px]" /> Resume</span>
                <span className="text-[12px] font-medium text-gray-900">{roleItem.resumeFile}</span>
              </div>
              <div className="flex items-center justify-between py-[8px]">
                <span className="text-[12px] text-gray-500 flex items-center gap-[6px]"><User className="w-[14px] h-[14px]" /> Tone</span>
                <Badge variant="purple">{roleItem.tone}</Badge>
              </div>
            </div>

            {roleItem.history && roleItem.history.length > 0 && (
              <div className="w-full mt-[16px] pt-[16px] border-t border-gray-100">
                <h4 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-[12px]">Interview History</h4>
                <div className="space-y-[8px]">
                  {roleItem.history.map((interview, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 px-[12px] py-[8px] rounded-[6px]">
                      <span className="text-[13px] text-gray-700">{interview.date}</span>
                      <span className={`text-[13px] font-semibold ${interview.score >= 80 ? 'text-success-600' : 'text-orange-500'}`}>
                        {interview.score}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
