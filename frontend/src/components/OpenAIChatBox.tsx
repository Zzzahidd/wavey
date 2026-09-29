import React, { useState, useRef, useEffect } from 'react';
import { Plus, ArrowUp, GitBranch, Sparkles, Check, ChevronDown, Layers, Terminal } from 'lucide-react';

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

const ANIMATED_PROMPTS = [
  'Assign a task or ask anything',
  'Build an Antigravity AI IDE with multi-agent orchestration',
  'Generate a full-stack Next.js app with real-time SSE streaming',
  'Create an automated evaluation suite for LLM regression testing',
  'Analyze token usage & optimize inference latency across models',
  'Synthesize a full SaaS platform with MongoDB and Google OAuth'
];

export const OpenAIChatBox: React.FC<OpenAIChatBoxProps> = ({ onSubmit, isLoading = false }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isAttachOpen, setIsAttachOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Typewriter animation state
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect loop
  useEffect(() => {
    if (isFocused || prompt.length > 0) return;

    const fullText = ANIMATED_PROMPTS[currentPromptIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedPlaceholder.length < fullText.length) {
          setDisplayedPlaceholder(fullText.slice(0, displayedPlaceholder.length + 1));
        } else {
          // Pause before starting deletion
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayedPlaceholder.length > 0) {
          setDisplayedPlaceholder(fullText.slice(0, displayedPlaceholder.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPromptIndex((prev) => (prev + 1) % ANIMATED_PROMPTS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, currentPromptIndex, isFocused, prompt]);

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
      if (prompt.trim()) {
        handleSend();
      }
    }
  };

  const handleSend = () => {
    const textToSend = prompt.trim();
    if (!textToSend || isLoading) return;
    onSubmit(textToSend, selectedModel.id);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={dropdownRef}>
      
      {/* Outer Floating Card Container (OpenAI-style Input Bar with Fernand double-bezel) */}
      <div className="bg-white rounded-3xl border border-black/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.14),0_4px_16px_-4px_rgba(0,0,0,0.06)] p-3.5 sm:p-4 transition-all focus-within:border-black/30 focus-within:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.22)]">
        
        {/* Main Textarea & Animated Placeholder Container */}
        <div className="relative min-h-[44px] flex items-center">
          
          {/* Animated Dynamic Typewriter Overlay (Visible when input is empty) */}
          {!prompt && (
            <div 
              onClick={() => textareaRef.current?.focus()}
              className="absolute left-2 top-2 right-2 text-base sm:text-lg text-zinc-400 select-none pointer-events-none flex items-center gap-0.5 leading-relaxed font-normal"
            >
              <span>{displayedPlaceholder}</span>
              <span className="inline-block w-[2px] h-5 bg-zinc-800 animate-blink align-middle ml-0.5" />
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            rows={1}
            aria-label="Ask Wavey AI to design, build, or analyze"
            className="w-full bg-transparent text-zinc-900 text-base sm:text-lg resize-none outline-none px-2 py-1 leading-relaxed max-h-40 overflow-y-auto relative z-10 font-normal"
          />
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/90 px-1 gap-1">
          
          {/* Left Controls: Attach Context and Engine Selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            
            {/* 1. Attach / Context Button */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsAttachOpen(!isAttachOpen)}
                className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-all active:scale-95 cursor-pointer"
                title="Add attachment or prompt context"
                aria-label="Add attachment"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Attach Popover */}
              {isAttachOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-60 sm:w-64 max-w-[85vw] bg-white rounded-2xl border border-zinc-200 shadow-xl p-2 z-50 animate-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2 py-1">
                    Add context
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => (p ? `${p} [GitHub Repository Context]` : 'Analyze my repository architecture and performance bottlenecks'));
                      setIsAttachOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition cursor-pointer"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">Connect GitHub Repository</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => (p ? `${p} [Full-Stack Architecture]` : 'Scaffold a complete SaaS application with MongoDB and Google OAuth'));
                      setIsAttachOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                    <span className="truncate">Generate Software Blueprint</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => (p ? `${p} [Terminal CLI Agent]` : 'Run continuous eval tests with automated regression scoring'));
                      setIsAttachOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 rounded-xl flex items-center gap-2 transition cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">Attach Workspace CLI</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Model / Engine Selector Button */}
            <div className="relative min-w-0">
              <button
                type="button"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="h-8 px-2.5 sm:px-3 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 flex items-center gap-1 sm:gap-1.5 text-xs font-medium text-zinc-700 transition-all active:scale-95 cursor-pointer max-w-full"
                aria-label="Select AI Model"
              >
                <Layers className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="max-w-[95px] xs:max-w-[140px] sm:max-w-[180px] truncate font-medium">{selectedModel.name}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
              </button>

              {/* Model Dropdown */}
              {isModelDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-60 sm:w-68 max-w-[85vw] bg-white rounded-2xl border border-zinc-200 shadow-xl p-1.5 z-50">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider px-2.5 py-1">
                    Select Inference Engine
                  </div>
                  {AVAILABLE_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl flex items-center justify-between transition cursor-pointer ${
                        selectedModel.id === model.id ? 'bg-zinc-100 font-semibold text-zinc-900' : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex flex-col min-w-0 pr-1">
                        <span className="text-zinc-900 truncate">{model.name}</span>
                        <span className="text-[10px] text-zinc-400 truncate">{model.badge} · {model.speed}</span>
                      </div>
                      {selectedModel.id === model.id && (
                        <Check className="w-4 h-4 text-zinc-900 stroke-[2.5] shrink-0" />
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
            aria-label="Send prompt"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
              prompt.trim() && !isLoading
                ? 'bg-[#111111] text-white hover:bg-black shadow-sm active:scale-90 cursor-pointer'
                : 'bg-zinc-100 text-zinc-300 border border-zinc-200/60 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

      </div>

    </div>
  );
};
