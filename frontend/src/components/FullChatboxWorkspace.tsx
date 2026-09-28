import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Paperclip, 
  FolderKanban, 
  Mic, 
  ArrowUp, 
  ChevronDown, 
  LogOut, 
  Sparkles, 
  Home, 
  Check, 
  Terminal,
  Code2,
  Trash2,
  Copy
} from 'lucide-react';
import { User, Session, Message } from '../lib/types';
import { fetchSessions, createSession, deleteSession, streamChat } from '../lib/api';

interface FullChatboxWorkspaceProps {
  user: User | null;
  onBackToHome: () => void;
  onLogout: () => void;
  initialPrompt?: string;
}

export const FullChatboxWorkspace: React.FC<FullChatboxWorkspaceProps> = ({
  user,
  onBackToHome,
  onLogout,
  initialPrompt = ''
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('session-acme-prep');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'user',
      content: 'Prep me for my Acme call tomorrow',
      timestamp: '2h ago'
    },
    {
      id: 'm2',
      role: 'assistant',
      content: `### Briefing for tomorrow's Acme call\n\nI have gathered context across your integrated tools:\n\n- **HubSpot** · Fetch Acme deal record — Negotiation stage, \$84k ARR\n- **Gmail** · Search recent Acme threads — 4 emails this week\n- **Google Calendar** · Tomorrow 2 PM — 'Acme: Contract Review' with Eunice, Oleg, Derek\n- **Google Drive** · Found 'Acme Proposal v3.pdf' shared by Sarah, last edited Mar 14\n\n#### Recommended Discussion Points:\n1. Lock in seat tiers for engineering & design pods.\n2. Review SOC2 compliance attachment & security sign-off.\n3. Finalize custom SLA turnaround for enterprise support.\n\n\`\`\`typescript\n// Generated Action Item: Contract payload\nexport const dealSummary = {\n  account: "Acme Corp",\n  tier: "Enterprise Sovereign",\n  seats: 50,\n  arr: 84000,\n  status: "Ready for Signature"\n};\n\`\`\``,
      timestamp: '2h ago'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState(initialPrompt);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load sessions from API
  useEffect(() => {
    async function load() {
      const data = await fetchSessions();
      if (data && data.length > 0) {
        setSessions(data);
      }
    }
    load();
  }, []);

  // Handle initial prompt if passed
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleCreateNewSession = async () => {
    try {
      const newSession = await createSession('New Session');
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(newSession.sessionId);
      setMessages([]);
    } catch {
      const fallbackId = `session_${Date.now()}`;
      const newSession: Session = {
        sessionId: fallbackId,
        title: 'New Session',
        messages: [],
        updatedAt: new Date().toISOString()
      };
      setSessions(prev => [newSession, ...prev]);
      setActiveSessionId(fallbackId);
      setMessages([]);
    }
  };

  const handleSelectSession = (session: Session) => {
    setActiveSessionId(session.sessionId);
    setMessages(session.messages && session.messages.length > 0 ? session.messages : []);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isStreaming) return;

    setInputPrompt('');

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

    const history = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    await streamChat(
      prompt,
      activeSessionId,
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
      (full) => {
        setIsStreaming(false);
      },
      (err) => {
        setIsStreaming(false);
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === 'assistant') {
            last.content += `\n\n[Error]: ${err.message}`;
          }
          return updated;
        });
      }
    );
  };

  const currentSession = sessions.find(s => s.sessionId === activeSessionId) || {
    title: 'Prep for Acme call tomorrow',
    sessionId: activeSessionId
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#FDFDFD] text-zinc-900 overflow-hidden font-sans">
      
      {/* =========================================================================
          LEFT SIDEBAR (Matches chatbox.png)
         ========================================================================= */}
      <aside className="w-64 sm:w-72 bg-white border-r border-zinc-200 flex flex-col justify-between shrink-0 select-none">
        
        <div>
          {/* Top Window Control Dots & Actions */}
          <div className="p-4 flex items-center justify-between border-b border-zinc-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block"></span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <button 
                onClick={onBackToHome}
                className="hover:text-zinc-700 transition" 
                title="Back to Landing Page"
              >
                <Home className="w-4 h-4" />
              </button>
              <button className="hover:text-zinc-700 transition" title="Search sessions">
                <Search className="w-4 h-4" />
              </button>
              <button className="hover:text-zinc-700 transition" title="Filter sessions">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* + New Session Button */}
          <div className="p-3">
            <button
              onClick={handleCreateNewSession}
              className="w-full py-2 px-3 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-800 flex items-center gap-2 shadow-2xs transition active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-zinc-500" />
              <span>+ New Session</span>
            </button>
          </div>

          {/* Sessions List */}
          <div className="px-2 py-1 space-y-1">
            {[
              { id: 'session-acme-prep', title: 'Prep for Acme call tomorrow', time: '2h' },
              { id: 'session-notion-deal', title: 'Follow up with Notion deal', time: '5h' },
              { id: 'session-figma-strategy', title: 'Renewal strategy for Figma', time: '1d' },
            ].map(item => {
              const isSelected = activeSessionId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSessionId(item.id);
                    if (item.id === 'session-acme-prep') {
                      setMessages([
                        {
                          id: 'm1',
                          role: 'user',
                          content: 'Prep me for my Acme call tomorrow',
                          timestamp: '2h ago'
                        },
                        {
                          id: 'm2',
                          role: 'assistant',
                          content: `### Briefing for tomorrow's Acme call\n\nI have gathered context across your integrated tools:\n\n- **HubSpot** · Fetch Acme deal record — Negotiation stage, \$84k ARR\n- **Gmail** · Search recent Acme threads — 4 emails this week\n- **Google Calendar** · Tomorrow 2 PM — 'Acme: Contract Review' with Eunice, Oleg, Derek\n- **Google Drive** · Found 'Acme Proposal v3.pdf' shared by Sarah, last edited Mar 14\n\n#### Recommended Discussion Points:\n1. Lock in seat tiers for engineering & design pods.\n2. Review SOC2 compliance attachment & security sign-off.\n3. Finalize custom SLA turnaround for enterprise support.`,
                          timestamp: '2h ago'
                        }
                      ]);
                    } else {
                      setMessages([]);
                    }
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-zinc-100 font-semibold text-zinc-950'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <span className="truncate pr-2">{item.title}</span>
                  <span className="text-[11px] text-zinc-400 shrink-0">{item.time}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* User Info / Sign Out Footer */}
        <div className="p-3 border-t border-zinc-200/80 bg-zinc-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=WaveyUser'} 
                alt="Avatar" 
                className="w-7 h-7 rounded-full border border-zinc-200"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-900 truncate max-w-[120px]">{user?.name || 'Developer'}</span>
                <span className="text-[10px] text-zinc-400">Wavey Pro</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-zinc-400 hover:text-zinc-800 transition"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* =========================================================================
          MAIN CHAT WORKSPACE AREA
         ========================================================================= */}
      <main className="flex-1 flex flex-col justify-between h-full bg-[#FDFDFD] relative overflow-hidden">
        
        {/* Top Session Title Bar */}
        <header className="h-14 border-b border-zinc-200/80 px-6 flex items-center justify-between bg-white/80 backdrop-blur-xs">
          <button className="flex items-center gap-1.5 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition">
            <span>{currentSession.title}</span>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono">Kernel: Gemini 2.5 Pro</span>
            <button
              onClick={onBackToHome}
              className="px-3 py-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-zinc-100 rounded-lg border border-zinc-200 transition"
            >
              Exit to Home
            </button>
          </div>
        </header>

        {/* Messages Stream Container */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-12 lg:px-24 py-8 space-y-6">
          
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 space-y-3 my-auto">
              <Sparkles className="w-8 h-8 text-[#5E1312]" />
              <h3 className="text-base font-bold text-zinc-700">What would you like to build today?</h3>
              <p className="text-xs text-zinc-400 max-w-sm">
                Ask Wavey to scaffold a full application, generate a component, or synthesize automated tests.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={msg.id || i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {msg.role === 'user' ? (
                  /* User Prompt Bubble (Matches chatbox.png top-right style) */
                  <div className="max-w-xl bg-zinc-100 text-zinc-900 px-4 py-2.5 rounded-2xl text-sm font-medium shadow-2xs border border-zinc-200/60">
                    {msg.content}
                  </div>
                ) : (
                  /* Assistant Response */
                  <div className="max-w-2xl w-full text-zinc-800 text-sm leading-relaxed space-y-4">
                    
                    {/* Integration context badges (if matching demo session) */}
                    {msg.content.includes('HubSpot') && (
                      <div className="space-y-2 font-sans">
                        <div className="flex items-center gap-2 text-xs text-zinc-700">
                          <span className="w-4 h-4 rounded bg-orange-500 text-white font-bold flex items-center justify-center text-[10px]">H</span>
                          <span><strong>HubSpot</strong> · Fetch Acme deal record — Negotiation stage, $84k ARR</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-700">
                          <span className="w-4 h-4 rounded bg-red-500 text-white font-bold flex items-center justify-center text-[10px]">G</span>
                          <span><strong>Gmail</strong> · Search recent Acme threads — 4 emails this week</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-700">
                          <span className="w-4 h-4 rounded bg-blue-500 text-white font-bold flex items-center justify-center text-[10px]">C</span>
                          <span><strong>Google Calendar</strong> · Tomorrow 2 PM — 'Acme: Contract Review' with Eunice, Oleg, Derek</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-700">
                          <span className="w-4 h-4 rounded bg-amber-500 text-white font-bold flex items-center justify-center text-[10px]">D</span>
                          <span><strong>Google Drive</strong> · Found 'Acme Proposal v3.pdf' shared by Sarah, last edited Mar 14</span>
                        </div>
                      </div>
                    )}

                    {/* Markdown rendering simulation */}
                    <div className="prose prose-zinc text-sm max-w-none">
                      <div className="whitespace-pre-wrap font-sans text-zinc-800">
                        {msg.content}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            ))
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* =========================================================================
            BOTTOM CHAT INPUT BOX (Matches chatbox.png bottom bar)
           ========================================================================= */}
        <div className="p-4 sm:p-6 max-w-4xl w-full mx-auto">
          <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3 flex flex-col gap-2">
            
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="What would you like to work on?"
              className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 outline-none px-2 py-1"
            />

            <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 transition"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-xs font-semibold text-zinc-700 flex items-center gap-1.5 transition"
                >
                  <FolderKanban className="w-3.5 h-3.5 text-zinc-500" />
                  <span>My Project</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 transition"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputPrompt.trim() || isStreaming}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
                    inputPrompt.trim() && !isStreaming
                      ? 'bg-[#5E1312] text-white hover:opacity-90 active:scale-95 shadow-sm'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
};
