import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  SquarePen, 
  ArrowUp, 
  Check, 
  Code2, 
  Trash2, 
  Copy, 
  LogOut, 
  X, 
  Paperclip, 
  PanelLeftClose, 
  PanelLeftOpen,
  Mic,
  AudioLines,
  ChevronDown,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { User, Session, Message } from '../lib/types';
import { fetchSessions, deleteSession, streamChat } from '../lib/api';

interface FullChatboxWorkspaceProps {
  user: User | null;
  onLogout: () => void;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
  initialPrompt?: string;
  onBackToHome?: () => void;
}

const AVAILABLE_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5', tier: 'Flash', provider: 'Google' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5', tier: 'Pro', provider: 'Google' },
  { id: 'sonnet-3.7', name: 'Sonnet 3.7', tier: 'Medium', provider: 'Anthropic' },
  { id: 'gpt-4o', name: 'GPT-4o', tier: 'Omni', provider: 'OpenAI' }
];

export const FullChatboxWorkspace: React.FC<FullChatboxWorkspaceProps> = ({
  user,
  onLogout,
  onBackToHome,
  initialPrompt = ''
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputPrompt, setInputPrompt] = useState(initialPrompt);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  // On desktop (>= 768px), sidebar starts open; on mobile (< 768px), it starts closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load user sessions on mount and filter out any stale "New Session"
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSessions();
        // Strict filter: exclude any session titled "New Session" or with empty title
        const validSessions = (data || []).filter(
          s => s.title && s.title !== 'New Session' && s.title.trim() !== ''
        );
        
        if (validSessions.length > 0) {
          setSessions(validSessions);
          setActiveSessionId(validSessions[0].sessionId);
          setMessages(validSessions[0].messages || []);
        } else {
          const initialId = `session_${Date.now()}`;
          setActiveSessionId(initialId);
          setSessions([]);
          setMessages([]);
        }
      } catch (err) {
        console.error('Failed to load sessions:', err);
        const initialId = `session_${Date.now()}`;
        setActiveSessionId(initialId);
        setMessages([]);
      }
    }
    load();
  }, []);

  // Handle initial prompt if passed from hero
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, []);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputPrompt]);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) {
        setIsModelMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // New Chat handler: reset active state cleanly without adding empty items to sidebar
  const handleCreateNewSession = () => {
    const newSessionId = `session_${Date.now()}`;
    setActiveSessionId(newSessionId);
    setMessages([]);
    setAttachedFiles([]);
    setInputPrompt('');
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSelectSession = (session: Session) => {
    setActiveSessionId(session.sessionId);
    setMessages(session.messages || []);
    setAttachedFiles([]);
    setInputPrompt('');
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    try {
      await deleteSession(sessionId);
    } catch {
      // Ignored
    }
    const updated = sessions.filter(s => s.sessionId !== sessionId);
    setSessions(updated);
    if (activeSessionId === sessionId) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].sessionId);
        setMessages(updated[0].messages || []);
      } else {
        const newId = `session_${Date.now()}`;
        setActiveSessionId(newId);
        setMessages([]);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileNames: string[] = [];
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
    }
    setAttachedFiles(prev => [...prev, ...fileNames]);
    e.target.value = '';
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isStreaming) return;

    let fullPromptWithAttachments = prompt;
    if (attachedFiles.length > 0) {
      fullPromptWithAttachments = `[Attached files: ${attachedFiles.join(', ')}]\n\n${prompt}`;
    }

    setInputPrompt('');
    setAttachedFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const currentId = activeSessionId || `session_${Date.now()}`;
    if (!activeSessionId) {
      setActiveSessionId(currentId);
    }

    const userMessage: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: 'Just now'
    };

    const assistantPlaceholder: Message = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: 'Thinking...'
    };

    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
    setIsStreaming(true);

    const sessionTitle = prompt.length > 30 ? `${prompt.slice(0, 30)}...` : prompt;

    // Dynamically update session title in sidebar
    setSessions(prev => {
      const exists = prev.find(s => s.sessionId === currentId);
      if (exists) {
        return prev.map(s => s.sessionId === currentId ? {
          ...s,
          title: s.title === 'New chat' || s.title === 'New Session' ? sessionTitle : s.title,
          updatedAt: new Date().toISOString()
        } : s);
      } else {
        return [{
          sessionId: currentId,
          title: sessionTitle,
          messages: [],
          updatedAt: new Date().toISOString()
        }, ...prev];
      }
    });

    const history = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    await streamChat(
      fullPromptWithAttachments,
      currentId,
      history,
      selectedModel,
      (token) => {
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            last.content += token;
            last.timestamp = 'Just now';
          }
          return updated;
        });
      },
      () => {
        setIsStreaming(false);
      },
      (err) => {
        setIsStreaming(false);
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            last.content = `[Wavey Engine Notice]: ${err.message}`;
          }
          return updated;
        });
      }
    );
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Filter out any stale "New Session"
  const visibleSessions = sessions.filter(s => s.title !== 'New Session');

  // User initials calculation for avatar
  const getUserInitials = (name?: string) => {
    if (!name) return 'Z';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const currentModelObj = AVAILABLE_MODELS.find(m => m.id === selectedModel) || AVAILABLE_MODELS[0];

  // Render markdown text and formatted code blocks
  const renderFormattedMessage = (content: string) => {
    if (content.includes('```')) {
      const parts = content.split(/(```[\s\S]*?```)/g);
      return (
        <div className="space-y-3">
          {parts.map((part, index) => {
            if (part.startsWith('```')) {
              const lines = part.slice(3, -3).trim().split('\n');
              const firstLine = lines[0].trim();
              const hasLang = !firstLine.includes(' ') && firstLine.length > 0 && lines.length > 1;
              const lang = hasLang ? firstLine : 'code';
              const code = hasLang ? lines.slice(1).join('\n') : lines.join('\n');

              return (
                <div key={index} className="my-3 rounded-2xl overflow-hidden border border-zinc-800 bg-[#141414] shadow-md">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#1c1c1c] border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                    <span className="flex items-center gap-1.5 font-semibold text-zinc-300">
                      <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                      {lang}
                    </span>
                    <button
                      onClick={() => handleCopyCode(code, index)}
                      className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition cursor-pointer px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs sm:text-[13px] font-mono text-zinc-100 overflow-x-auto leading-relaxed selection:bg-zinc-700 selection:text-white">
                    <code>{code}</code>
                  </pre>
                </div>
              );
            }

            return (
              <div key={index} className="whitespace-pre-wrap font-sans text-zinc-800 text-sm sm:text-base leading-relaxed">
                {part}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="whitespace-pre-wrap font-sans text-zinc-800 text-sm sm:text-base leading-relaxed">
        {content}
      </div>
    );
  };

  const hasMessages = messages.length > 0;
  const canSend = (inputPrompt.trim().length > 0 || attachedFiles.length > 0) && !isStreaming;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#FAFAFA] text-zinc-900 overflow-hidden font-sans select-none">
      
      {/* Hidden File Input for Clean Attachment Uploads via + Button */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        className="hidden"
      />

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          aria-label="Close sidebar overlay"
        />
      )}

      {/* =========================================================================
          LEFT SIDEBAR (Responsive: Fixed Overlay on Mobile, Smooth Collapsible Panel on Desktop)
         ========================================================================= */}
      <aside 
        className={`
          fixed md:relative inset-y-0 left-0 z-50 md:z-40 flex flex-col justify-between shrink-0 h-full bg-[#F6F7F9] border-r border-zinc-200/90 select-none
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isSidebarOpen 
            ? 'translate-x-0 w-72 sm:w-68 min-w-[17rem] max-w-[85vw] sm:max-w-[17rem] opacity-100 shadow-2xl md:shadow-none' 
            : '-translate-x-full md:translate-x-0 md:w-0 md:min-w-0 md:max-w-0 md:opacity-0 md:border-r-0 md:pointer-events-none'
          }
        `}
      >
        {/* Fixed Width Inner Container to prevent text jitter during collapse animation */}
        <div className="w-72 sm:w-68 min-w-[17rem] max-w-[85vw] sm:max-w-[17rem] flex flex-col h-full justify-between shrink-0">
          
          {/* Top Header & New Chat Area */}
          <div className="p-3 flex flex-col flex-1 overflow-hidden">
            
            {/* Top Brand Title & Sidebar Close Toggle */}
            <div className="flex items-center justify-between px-2 py-2 mb-2">
              <span className="font-bold text-base text-zinc-900 tracking-tight">
                Wavey
              </span>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/70 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer"
                title="Close sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* New Chat Button (Prominent pill in Light Mode) */}
            <button
              type="button"
              onClick={handleCreateNewSession}
              className="w-full py-2.5 px-3.5 bg-white hover:bg-zinc-50 text-zinc-900 rounded-xl text-sm font-medium flex items-center gap-3 transition-all duration-150 active:scale-[0.98] cursor-pointer border border-zinc-200/90 shadow-2xs mb-3 group"
            >
              <SquarePen className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
              <span>New chat</span>
            </button>

            {/* Recents Section Header */}
            <div className="text-[11px] font-semibold text-zinc-400 px-2 pt-2 pb-1.5 uppercase tracking-wider">
              Recents
            </div>

            {/* Recents Chat Sessions List */}
            <div className="flex-1 overflow-y-auto space-y-0.5 custom-scrollbar pr-1">
              {visibleSessions.length === 0 ? (
                <div className="py-6 text-center text-xs text-zinc-400">
                  No conversations yet
                </div>
              ) : (
                visibleSessions.map(session => (
                  <div
                    key={session.sessionId}
                    onClick={() => handleSelectSession(session)}
                    className={`group w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-[13px] flex items-center justify-between transition-all duration-150 cursor-pointer ${
                      activeSessionId === session.sessionId
                        ? 'bg-zinc-200/80 text-zinc-900 font-semibold border border-zinc-300/60 shadow-2xs'
                        : 'text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900'
                    }`}
                  >
                    <span className="truncate pr-2">{session.title || 'New chat'}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSession(e, session.sessionId)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-rose-600 rounded transition-opacity cursor-pointer"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* =========================================================================
              BOTTOM OF SIDEBAR: USER ACCOUNT PROFILE (Light Mode)
             ========================================================================= */}
          <div className="p-3 border-t border-zinc-200/90 bg-[#F6F7F9] relative" ref={userMenuRef}>
            
            {/* User Profile Pill Bar (Trigger matching Image 2) */}
            <div 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full p-2 bg-transparent hover:bg-zinc-200/60 rounded-2xl transition-colors flex items-center justify-between cursor-pointer group select-none"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-zinc-200" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#8c322b] text-white font-medium text-xs flex items-center justify-center shrink-0 uppercase shadow-xs">
                    {getUserInitials(user?.name)}
                  </div>
                )}

                {/* Name and Plan */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-zinc-900 truncate leading-snug">
                    {user?.name || 'Zahid Islam'}
                  </span>
                  <span className="text-xs text-zinc-500 truncate leading-snug">
                    Free
                  </span>
                </div>
              </div>

              {/* Upgrade Button Badge */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="px-3.5 py-1 text-xs font-semibold bg-white hover:bg-zinc-50 text-zinc-900 rounded-full border border-zinc-200/90 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                Upgrade
              </button>
            </div>

            {/* Account Popover Menu (Redesigned matching Image 2, with only Log out option) */}
            {isUserMenuOpen && (
              <div className="absolute bottom-[calc(100%+8px)] left-2 right-2 bg-white border border-zinc-200/90 rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 select-none">
                {/* Top Profile Summary Item */}
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-100/70 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user?.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt="Avatar" 
                        className="w-8 h-8 rounded-full border border-zinc-200 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#8c322b] text-white font-medium text-xs flex items-center justify-center shrink-0 uppercase">
                        {getUserInitials(user?.name)}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-zinc-900 truncate leading-snug">
                        {user?.name || 'Zahid Islam'}
                      </span>
                      <span className="text-xs text-zinc-500 font-normal truncate leading-snug mt-0.5">
                        Free
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-700 transition-colors shrink-0 ml-2" />
                </div>

                {/* Subtle Divider */}
                <div className="h-px bg-zinc-100 my-1 mx-1" />

                {/* Single Action: Log out (Exact Match to Image 2) */}
                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full px-2.5 py-2 text-sm font-normal text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100/80 rounded-xl flex items-center gap-3 transition-colors cursor-pointer text-left group"
                >
                  <LogOut className="w-4 h-4 text-zinc-800 group-hover:text-zinc-950 transition-colors shrink-0" />
                  <span>Log out</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </aside>

      {/* =========================================================================
          MAIN CHAT WORKSPACE (Clean, Minimalist Light Mode, Fully Responsive)
         ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between h-full w-full min-w-0 bg-[#FAFAFA] relative overflow-hidden transition-all duration-300">
        
        {/* Minimalist Light Mode Top Header */}
        <header className="h-12 px-3 sm:px-6 flex items-center justify-between select-none border-b border-zinc-200/80 bg-white/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Sidebar Open/Toggle Button: Always accessible on mobile, and when sidebar closed on desktop */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
              title="Toggle sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>

            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 px-2 py-1 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer hidden xs:inline"
              >
                Wavey
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCreateNewSession}
              className="p-1.5 px-2.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-zinc-200/80 shadow-2xs bg-white"
              title="New chat"
            >
              <SquarePen className="w-3.5 h-3.5" />
              <span className="inline">New chat</span>
            </button>
          </div>
        </header>

        {/* Message Stream or Centered Empty State */}
        <div className={`flex-1 overflow-y-auto px-3 sm:px-6 lg:px-20 select-text ${hasMessages ? 'py-4 sm:py-6 space-y-4 sm:space-y-6' : 'flex flex-col items-center justify-center p-3 sm:p-4'}`}>
          
          {!hasMessages ? (
            /* CENTERED EMPTY STATE: Exact Match to Photo 4 */
            <div className="flex flex-col items-center justify-center text-center -mt-8 sm:-mt-16 w-full max-w-2xl px-2 sm:px-4 animate-in fade-in duration-300">
              
              {/* Attached files indicator badge */}
              {attachedFiles.length > 0 && (
                <div className="w-full flex flex-wrap gap-2 mb-2 px-1 justify-start">
                  {attachedFiles.map((file, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 rounded-lg text-xs border border-zinc-200 shadow-2xs">
                      <Paperclip className="w-3 h-3 text-zinc-500" />
                      <span className="max-w-[130px] sm:max-w-[180px] truncate">{file}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                        className="hover:text-rose-500 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Photo 4 Rounded Input Dock Card */}
              <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-zinc-300 p-3 sm:p-4 flex flex-col gap-2.5 sm:gap-3 transition-all focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/5">
                
                {/* Input Textarea with Photo 4 placeholder */}
                <textarea
                  rows={2}
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="How can I help you today?"
                  className="w-full bg-transparent text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 outline-none resize-none leading-relaxed font-normal"
                  autoFocus
                />

                {/* Bottom Action Bar matching Photo 4: [+] ... [Model Picker] [Mic] [Send] */}
                <div className="flex items-center justify-between pt-1 gap-1">
                  
                  {/* Left Controls: [+] */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
                      title="Attach files"
                    >
                      <Plus className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>

                  {/* Right Controls: [Model + Tier] [Mic] [AudioWave / Send] */}
                  <div className="flex items-center gap-1.5 sm:gap-2 relative shrink-0" ref={modelMenuRef}>
                    
                    {/* Model Picker Pill */}
                    <button
                      type="button"
                      onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer border border-zinc-200/70"
                      title="Select model"
                    >
                      <span className="font-semibold truncate max-w-[80px] xs:max-w-none">{currentModelObj.name}</span>
                      <span className="text-zinc-500 font-normal hidden xs:inline">{currentModelObj.tier}</span>
                    </button>

                    {/* Model Dropdown Menu */}
                    {isModelMenuOpen && (
                      <div className="absolute bottom-10 right-0 w-48 sm:w-52 bg-white border border-zinc-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="text-[10px] font-semibold text-zinc-400 px-2 py-1 uppercase tracking-wider">
                          Select AI Model
                        </div>
                        {AVAILABLE_MODELS.map(m => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedModel(m.id);
                              setIsModelMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                              selectedModel === m.id
                                ? 'bg-zinc-100 text-zinc-900 font-semibold'
                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{m.name}</span>
                              <span className="text-[10px] text-zinc-400">{m.tier}</span>
                            </div>
                            {selectedModel === m.id && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Microphone Icon Button */}
                    <button
                      type="button"
                      className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      title="Voice input"
                    >
                      <Mic className="w-4 h-4" />
                    </button>

                    {/* Voice Waveform or Send Button */}
                    {canSend ? (
                      <button
                        type="button"
                        onClick={() => handleSendMessage()}
                        className="w-7 h-7 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                        title="Send message"
                      >
                        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="flex items-center gap-0.5 p-1 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                        title="Voice mode"
                      >
                        <AudioLines className="w-4 h-4" />
                        <ChevronDown className="w-3 h-3 text-zinc-400" />
                      </button>
                    )}

                  </div>

                </div>

              </div>

            </div>
          ) : (
            /* Active Conversation Flow in Light Mode */
            <div className="max-w-3xl mx-auto w-full space-y-4 sm:space-y-6">
              {messages.map((msg, i) => (
                <div key={msg.id || i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {msg.role === 'user' ? (
                    /* User Prompt Bubble */
                    <div className="max-w-xl bg-zinc-100 text-zinc-900 px-5 py-3 rounded-3xl text-sm sm:text-base font-normal shadow-xs leading-relaxed whitespace-pre-wrap border border-zinc-200/80">
                      {msg.content}
                    </div>
                  ) : (
                    /* Assistant Response */
                    <div className="max-w-3xl w-full text-zinc-800 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                      {msg.content ? (
                        renderFormattedMessage(msg.content)
                      ) : (
                        <div className="flex items-center gap-2 text-zinc-500 text-xs py-2 font-mono">
                          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>
                          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse [animation-delay:0.2s]"></span>
                          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse [animation-delay:0.4s]"></span>
                          <span>Thinking with Gemini...</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

        </div>

        {/* Bottom Light Mode Input Dock (Photo 4 Match - Visible when messages exist) */}
        {hasMessages && (
          <div className="p-2.5 sm:p-4 max-w-3xl w-full mx-auto animate-in slide-in-from-bottom-2 duration-200 shrink-0">
            
            {/* Attached files indicator badge */}
            {attachedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 px-1 justify-start">
                {attachedFiles.map((file, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-800 rounded-lg text-xs border border-zinc-200/80 shadow-2xs">
                    <Paperclip className="w-3 h-3 text-zinc-500" />
                    <span className="max-w-[130px] sm:max-w-[180px] truncate">{file}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="hover:text-rose-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Input Dock Box */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:border-zinc-300 p-2.5 sm:p-3 flex flex-col gap-2 transition-all duration-200 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/5">
              
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="How can I help you today?"
                className="w-full bg-transparent text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 outline-none px-1 py-1 resize-none max-h-36 leading-relaxed font-normal"
              />

              {/* Bottom Action Bar matching Photo 4 */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-100/90 gap-1">
                
                {/* Left Controls: [+] */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-7 h-7 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
                    title="Attach files"
                  >
                    <Plus className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>

                {/* Right Controls: [Model + Tier] [Mic] [AudioWave / Send] */}
                <div className="flex items-center gap-1.5 sm:gap-2 relative shrink-0" ref={modelMenuRef}>
                  
                  {/* Model Picker Pill */}
                  <button
                    type="button"
                    onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer border border-zinc-200/70"
                    title="Select model"
                  >
                    <span className="font-semibold truncate max-w-[80px] xs:max-w-none">{currentModelObj.name}</span>
                    <span className="text-zinc-500 font-normal hidden xs:inline">{currentModelObj.tier}</span>
                  </button>

                  {/* Model Dropdown Menu */}
                  {isModelMenuOpen && (
                    <div className="absolute bottom-9 right-0 w-48 sm:w-52 bg-white border border-zinc-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="text-[10px] font-semibold text-zinc-400 px-2 py-1 uppercase tracking-wider">
                        Select AI Model
                      </div>
                      {AVAILABLE_MODELS.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setSelectedModel(m.id);
                            setIsModelMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            selectedModel === m.id
                              ? 'bg-zinc-100 text-zinc-900 font-semibold'
                              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{m.name}</span>
                            <span className="text-[10px] text-zinc-400">{m.tier}</span>
                          </div>
                          {selectedModel === m.id && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Mic Button */}
                  <button
                    type="button"
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                    title="Voice input"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Voice Waveform or Send Button */}
                  {canSend ? (
                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      className="w-7 h-7 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                      title="Send message"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center gap-0.5 p-1 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      title="Voice mode"
                    >
                      <AudioLines className="w-4 h-4" />
                      <ChevronDown className="w-3 h-3 text-zinc-400" />
                    </button>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
};
