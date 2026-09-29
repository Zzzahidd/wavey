import React, { useState } from 'react';
import { 
  GitBranch, 
  FileCode, 
  Check, 
  Copy, 
  Play, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FileDiff {
  path: string;
  linesAdded: number;
  linesRemoved: number;
  content: {
    added: string[];
    removed: string[];
  };
}

const FILES: FileDiff[] = [
  {
    path: 'src/lib/auth/session.ts',
    linesAdded: 18,
    linesRemoved: 4,
    content: {
      added: [
        '+ export async function createEncryptedSession(user: UserSession): Promise<string> {',
        '+   const token = await new SignJWT({ sub: user.id, role: user.role })',
        '+     .setProtectedHeader({ alg: "HS256" })',
        '+     .setExpirationTime("7d")',
        '+     .sign(SECRET_KEY);',
        '+   return token;',
        '+ }'
      ],
      removed: [
        '- export function createLegacyCookie(id: string) {',
        '-   return "session=" + id;',
        '- }'
      ]
    }
  },
  {
    path: 'src/middleware/guard.ts',
    linesAdded: 12,
    linesRemoved: 2,
    content: {
      added: [
        '+ export async function authGuard(req: NextRequest) {',
        '+   const session = await verifyEncryptedSession(req.cookies.get("auth")?.value);',
        '+   if (!session) return NextResponse.redirect(new URL("/login", req.url));',
        '+   return NextResponse.next({ headers: { "x-user-id": session.sub } });',
        '+ }'
      ],
      removed: [
        '- export function authGuard(req: any) { return req.auth ? true : false; }'
      ]
    }
  },
  {
    path: 'tests/session.test.ts',
    linesAdded: 24,
    linesRemoved: 0,
    content: {
      added: [
        '+ describe("Session Cryptographic Invariants", () => {',
        '+   it("should reject expired JWT tokens with 401", async () => {',
        '+     const expired = await createExpiredToken();',
        '+     const result = await verifyEncryptedSession(expired);',
        '+     expect(result).toBeNull();',
        '+   });',
        '+ });'
      ],
      removed: []
    }
  }
];

interface CursorMultiFileDiffSectionProps {
  onOpenSignUp?: () => void;
}

export const CursorMultiFileDiffSection: React.FC<CursorMultiFileDiffSectionProps> = ({ onOpenSignUp }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [applied, setApplied] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const selectedFile = FILES[selectedFileIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section className="py-24 bg-[#FDFDFD] border-b border-zinc-200/60">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header without chip */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-[1.12]">
            Synthesize coordinated changes across your entire project.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Wavey refactors interconnected modules simultaneously. Frontend state, backend routes, database schemas, and unit tests stay in 100% mathematical sync.
          </p>
        </div>

        {/* Multi-File Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* File Tree Selector */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 font-mono text-xs text-zinc-400">
                <span className="font-bold text-zinc-900 uppercase">Modified Files</span>
                <span className="text-emerald-600 font-semibold">+54 / -6 lines</span>
              </div>

              <div className="space-y-2">
                {FILES.map((file, idx) => {
                  const isActive = selectedFileIndex === idx;
                  return (
                    <div
                      key={file.path}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between font-mono text-xs ${
                        isActive
                          ? 'bg-zinc-100 border-zinc-400 text-zinc-900 font-bold shadow-xs'
                          : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <FileCode className="w-4 h-4 text-zinc-500 shrink-0" />
                        <span className="truncate">{file.path}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] shrink-0">
                        <span className="text-emerald-600 font-bold">+{file.linesAdded}</span>
                        {file.linesRemoved > 0 && (
                          <span className="text-rose-500 font-bold">-{file.linesRemoved}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                AST Validated
              </span>
              <span>3 / 3 Files</span>
            </div>
          </div>

          {/* Code Diff Viewer */}
          <div className="lg:col-span-8 bg-zinc-950 rounded-2xl border border-zinc-800 p-5 sm:p-6 text-zinc-100 font-mono text-xs flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-200 font-semibold">{selectedFile.path}</span>
                </div>
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                  {applied ? '✓ Applied' : 'Pending Review'}
                </span>
              </div>

              <div className="mt-4 space-y-1 text-[11px] leading-relaxed overflow-x-auto">
                {selectedFile.content.removed.map((line, i) => (
                  <div key={`rem-${i}`} className="text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded border-l-2 border-rose-500">
                    {line}
                  </div>
                ))}
                {selectedFile.content.added.map((line, i) => (
                  <div key={`add-${i}`} className="text-emerald-300 bg-emerald-950/30 px-2 py-0.5 rounded border-l-2 border-emerald-500">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">Press Tab or click to apply patch</span>
              <button
                onClick={() => setApplied(!applied)}
                className="px-4 py-2 bg-[#FFFFFF] hover:bg-zinc-200 text-zinc-950 font-bold rounded-xl transition cursor-pointer text-xs btn-magnetic"
              >
                {applied ? 'Revert Patch' : 'Apply Multi-File Diff'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
