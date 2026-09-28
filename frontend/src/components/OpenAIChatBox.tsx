import React, { useState, useRef, useEffect } from 'react';
import { Plus, ArrowUp, GitBranch, Sparkles, Check, ChevronDown } from 'lucide-react';

interface OpenAIChatBoxProps {
  onSubmit: (prompt: string, model: string) => void;
  isLoading?: boolean;
}

const AVAILABLE_MODELS = [
  { id: 'gemini-1.5-flash', name: 'Gemini 2.5 Flash', badge: 'Ultra-fast', speed: '32ms' },
  { id: 'gemini-1.5-pro', name: 'Gemini 2.5 Pro', badge: 'Reasoning', speed: '85ms' },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', badge: 'Agentic', speed: '90ms' },
  { id: 'antigravity-engine', name: 'Antigravity Kernel', badge: 'Full-Stack', speed: '45ms' },
];

export const OpenAIChatBox: React.FC<OpenAIChatBoxProps> = ({ onSubmit, isLoading = false }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [prompt]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
        setIsAttachOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!prompt.trim() || isLoading) return;
    onSubmit(prompt.trim(), selectedModel.id);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={dropdownRef}>
      
      {/* Outer Floating Card Container (OpenAI-style Input Bar) */}
      <div className="bg-white rounded-3xl border border-black/8 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12),0_4px_16px_-4px_rgba(0,0,0,0.06)] p-3.5 sm:p-4 transition-all focus-within:border-zinc-400/80 focus-within:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]">
        
        {/* Main Textarea */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Assign a task or ask anything"
          rows={1}
          className="w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 text-base sm:text-lg resize-none outline-none px-2 py-1 leading-relaxed max-h-40 overflow-y-auto"
        />

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/80 px-1">
          
          {/* Left Buttons: Plus and Model Selector */}
          <div className="flex items-center gap-1.5">
            
            {/* 1. Plus Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAttachOpen(!isAttachOpen)}
                className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-all active:scale-95"
                title="Add attachment or prompt context"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Attach / Tools Popover */}
              {isAttachOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-2xl border border-zinc-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
                    Add context
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => (p ? `${p} [Include GitHub Repo Context]` : 'Analyze my GitHub repository architecture'));
                      setIsAttachOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Connect GitHub Repository</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => (p ? `${p} [Build Next.js + Tailwind App]` : 'Scaffold a complete SaaS application like Antigravity'));
                      setIsAttachOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#5E1312]" />
                    <span>Generate Software Blueprint</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Model / Agent Selector Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="h-8 px-2.5 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center gap-1.5 text-xs font-medium text-zinc-700 transition-all active:scale-95"
              >
                <GitBranch className="w-3.5 h-3.5 text-zinc-500" />
                <span className="max-w-[130px] truncate">{selectedModel.name}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {/* Model Dropdown */}
              {isModelDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-2xl border border-zinc-200 shadow-xl p-1.5 z-50">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
                    Select Engine
                  </div>
                  {AVAILABLE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-xl flex items-center justify-between transition ${
                        selectedModel.id === model.id ? 'bg-zinc-100 font-semibold text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{model.name}</span>
                        <span className="text-[10px] text-zinc-400">{model.badge} · {model.speed}</span>
                      </div>
                      {selectedModel.id === model.id && (
                        <Check className="w-4 h-4 text-[#5E1312]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Circular Up-Arrow Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!prompt.trim() || isLoading}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              prompt.trim() && !isLoading
                ? 'bg-[#5E1312] text-white hover:opacity-90 shadow-sm active:scale-90 cursor-pointer'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

      </div>

    </div>
  );
};
