# Wavey — Project Context & Engineering Architecture

> **Notice for AI Coding Agents & Engineers:**
> Read this document thoroughly before inspecting or modifying this repository. It defines the product mission, technology stack, directory layout, design language, animation constraints, backend service contracts, and development protocols for **Wavey**.

---

## 1. Executive Summary & Vision

**Wavey** is an AI engine and developer platform designed to empower engineers to build complex software, developer tools, and intelligent agents (such as *Antigravity*, *ChatGPT*, *Claude*, full-stack SaaS apps, and autonomous workflows).

### Core Capabilities
1. **Interactive Autonomous AI Workspace**: A dedicated full-screen developer workspace with session management, multi-tool integration badges (HubSpot, Gmail, Calendar, Drive), and real-time streaming AI code generation powered by Google Gemini.
2. **Hero Interactive Suite**: High-impact, kinetic hero section matching `assests/Design preview.png` with flowing animated mesh gradients, noise texture overlays, particle wave physics, an OpenAI-style prompt composer, and 5 interactive live preview telemetry cards.
3. **Developer Intelligence Bento & Architecture**: White double-bezel interactive cards including a Nightly Regression Eval Runner (92.3% pass rate with instant promotion action), an LLM Cost & Error Rate model slider, a Live Code Sandbox with reactive live execution preview, an Interactive CLI Terminal Agent, and a Visual Workflow Canvas.
4. **Resilient Full-Stack Foundation**: Multi-package monorepo powered exclusively by **pnpm**, featuring an Express + TypeScript + Gemini backend (with MongoDB and automatic in-memory fallback) and a React 18 + Vite + Tailwind CSS frontend.

---

## 2. Non-Negotiable Design & Engineering Constraints

Every AI agent and contributor must strictly adhere to these rules without exception:

| Rule | Specification | Rationale / Enforcement |
| :--- | :--- | :--- |
| **Package Manager** | **`pnpm` exclusively** | Never run `npm`, `yarn`, or `bun`. Use `pnpm --filter <pkg> <cmd>` or workspace scripts. |
| **Background Color** | `#FDFDFD` | Strict off-white canvas specified for the brand design. |
| **Primary CTA Color** | `#111111` | Deep obsidian pitch-black for primary buttons (`bg-[#111111] text-white hover:bg-black`) ensuring maximum WCAG AAA contrast ratio (21:1). |
| **Cursor Pointer** | **Global pointer on interactive elements** | All buttons, links, tabs, sliders, interactive cards, and modal triggers have explicit `cursor-pointer`. |
| **Animated Input Placeholder** | **Typewriter text cycler** | Chatbox inputs cycle through realistic developer prompts with an animated blinking typewriter cursor (`|`). |
| **Surface Cards** | `#FFFFFF` with double bezels | All cards must be crisp white (`#FFFFFF`) with subtle outer border `#E7E5E4` and inner rim `#F5F5F4` with Fernand-style magnetic hover lift. |
| **NO Fade In / Fade Out Animations** | **STRICT BAN on fade-in/fade-out transitions** | **Never use `opacity-0 to opacity-100` or fading keyframes.** All animations must be kinetic (continuous mesh translations, 3D tilts, spring scale, wave oscillations, radar sweeps, and mechanical sliders). |
| **ZERO Emojis** | **STRICT BAN on unicode emojis** | Emojis cheapen developer tools. Use vector SVG icons from `lucide-react` for all visual cues. |
| **Authentication Flow** | **Single-action Google OAuth** | Modals strictly match `assests/account create.png` and `assests/sigin.png` with centered maroon spiral wave emblem and "Continue with Google" as the single action (no email forms or guest mode). |
| **Spacing Grid** | Multiples of 4 | `gap-4` (16px), `p-8` (32px), `py-16` (64px), `px-4` (16px), etc. |
| **Typography** | Custom Helvetica Stack | Custom `@font-face` definitions for Helvetica and Helvetica-BoldOblique loaded in `frontend/src/index.css`. |
| **Vector Logos** | Sharp SVG Vectors | Logo and iconography must be crisp SVG vectors to eliminate any blurriness on Retina/High-DPI displays. |

---

## 3. Repository & Monorepo Structure

```text
Wavey/
├── .agents/                    # Specialized AI agent skills and instruction playbooks
├── assests/                    # Brand assets, design previews, textures, and Helvetica font files
│   ├── Design preview.png      # Hero section reference mockup
│   ├── chatbox.png             # Dedicated AI chat workspace reference mockup
│   ├── account create.png      # Sign-up modal reference mockup
│   ├── sigin.png               # Sign-in modal reference mockup
│   ├── Gradient.png            # Continuous background flowing gradient
│   ├── texture.png             # Fine grain overlay texture
│   ├── logo.svg & logo.png     # Wavey brand vector mark
│   └── Helvetica-*.ttf         # Helvetica and Helvetica-BoldOblique font binaries
├── cards inspiration/          # Bento design references and footer inspiration
├── backend/                    # Node.js + Express + TypeScript + Gemini Backend Service
│   ├── src/
│   │   ├── config.ts           # Environment variables and configuration loader
│   │   ├── db.ts               # MongoDB Mongoose connector with in-memory fallback
│   │   ├── index.ts            # Main Express server entrypoint
│   │   ├── models/             # Mongoose & In-Memory data models
│   │   │   ├── User.ts         # User schema, OAuth profile, and authentication
│   │   │   ├── Session.ts      # Chat session schema, tool integrations, and message log
│   │   │   └── Project.ts      # Generated code project schema and blueprints
│   │   ├── routes/             # RESTful API route controllers
│   │   │   ├── auth.ts         # Google OAuth, Guest login, Email auth, and /me
│   │   │   ├── chat.ts         # Server-Sent Events (SSE) Gemini streaming endpoint
│   │   │   ├── sessions.ts     # Chat session CRUD & demo seed data
│   │   │   └── projects.ts     # Blueprint generation and project storage
│   │   └── services/           # External API & AI services
│   │       └── gemini.ts       # Google Generative AI streaming and prompt engineering
│   ├── .env                    # Active local environment keys (Gemini, Mongo, Google OAuth)
│   ├── .env.example            # Committed template of environment variables
│   ├── package.json            # Backend dependencies & build scripts
│   └── tsconfig.json           # Backend TypeScript configuration
├── frontend/                   # React 18 + Vite + Tailwind CSS Frontend Application
│   ├── public/                 # Static assets (favicon, logo, textures, gradients, fonts)
│   ├── src/
│   │   ├── assets/             # Bundled visual assets & SVG icons
│   │   ├── components/         # Modular React UI components
│   │   │   ├── Navbar.tsx                   # Fixed glassmorphic navigation bar
│   │   │   ├── HeroSection.tsx              # Composed Hero matching Design preview.png
│   │   │   ├── HeroInteractiveCanvas.tsx    # Continuous animated gradient & wave canvas
│   │   │   ├── OpenAIChatBox.tsx            # Floating prompt bar with model dropdown
│   │   │   ├── HeroDashboardPreview.tsx     # 5 interactive preview telemetry cards
│   │   │   ├── AgentArchitectureSection.tsx # 4-tier autonomous runtime pipeline
│   │   │   ├── DeveloperIntelligenceBento.tsx # White double-bezel Evals & Code Sandbox bento
│   │   │   ├── WorkflowNodeCanvas.tsx       # Visual agent node graph & live simulation
│   │   │   ├── CapabilitiesMatrix.tsx       # Benchmarks & feature comparison matrix
│   │   │   ├── EnterpriseSection.tsx        # Sovereign cloud & security credentials
│   │   │   ├── PricingSection.tsx           # Solo, Team ($39), and Sovereign Enterprise
│   │   │   ├── DeveloperFooter.tsx          # Agency-grade footer with live clock & glowing banner
│   │   │   ├── AuthModals.tsx               # Sign In & Account Create modal dialogs
│   │   │   └── FullChatboxWorkspace.tsx     # Full-screen workspace matching chatbox.png
│   │   ├── lib/
│   │   │   ├── api.ts          # Centralized API fetch client and SSE stream reader
│   │   │   └── types.ts        # Shared TypeScript interfaces and domain schemas
│   │   ├── App.tsx             # Main application router and state orchestrator
│   │   ├── index.css           # Tailwind v4 theme, Helvetica @font-face, and kinetic keyframes
│   │   └── main.tsx            # React DOM mounting entrypoint
│   ├── index.html              # HTML shell with favicon, viewport, and typography
│   ├── package.json            # Frontend dependencies & build scripts
│   ├── tsconfig.json           # Frontend TypeScript configuration
│   └── vite.config.ts          # Vite configuration with backend API proxy
├── .gitignore                  # Production gitignore rules
├── AGENTS.md                   # Universal engineering contract for AI agents
├── context.md                  # This file (AI and developer orientation document)
├── package.json                # Monorepo root package definitions and scripts
├── pnpm-lock.yaml              # Monorepo frozen dependency lockfile
└── pnpm-workspace.yaml         # PNPM workspace packages definition
```

---

## 4. Frontend Component Architecture & Key Features

### 1. `HeroSection.tsx` & `HeroInteractiveCanvas.tsx`
- **Visual Match**: Implements the layout from `assests/Design preview.png`.
- **Kinetic Background**: Overlays `Gradient.png` and `texture.png` with continuous coordinate translation and rotation (no fading). An HTML5 `<canvas>` renders interactive sine waves that react to mouse position.
- **Headline**: High-impact Helvetica bold italic typography ("The AI engine to build your dream software.").
- **Action Pills**: Quick-prompt suggestion pills (`Create slides`, `Analyze data`, `Summarize document`, `Draft email`, `Brainstorm ideas`) that automatically populate the chat box.

### 2. `OpenAIChatBox.tsx`
- **Floating Input Bar**: Clean rounded container with maroon accents (`#5E1312`), model selector (`Gemini 2.5 Pro`, `Claude 3.7 Sonnet`, `GPT-4.5`, `DeepSeek R1`), attachment context pill, and circular SVG send button.
- **Direct Workspace Launch**: Pressing Enter or clicking Send transfers the prompt into the real-time full-screen AI workspace.

### 3. `HeroDashboardPreview.tsx`
Interactive 5-card dashboard preview straight from the design spec:
1. **Coding Insights Card**: Live PR activity stream (Pull Request #412 merged, TypeScript lint clean, 98.4% test coverage).
2. **Telemetry Radar Map**: Live scanning radar pulse with coordinate telemetry (`37.7749° N, 122.4194° W`) and ping nodes.
3. **AI Token Analytics**: Real-time token usage distribution chart (Claude 3.7 Sonnet vs Gemini 2.5 Pro) with active cache hit metrics.
4. **Prompt Diff Viewer**: Side-by-side prompt version comparison highlighting insertions and deletions.
5. **LemonSqueezy iOS Preview**: Live mobile checkout card with instant payment trigger and success toast.

### 4. `FullChatboxWorkspace.tsx`
- **Visual Match**: Implements `assests/chatbox.png`.
- **Multi-Tool Integrations**: Contextual badges for HubSpot, Gmail, Google Calendar, and Google Drive.
- **Sessions Sidebar**: Shows recent developer sessions (e.g. `Acme Software Briefing`, `Antigravity IDE Engine`, `Customer Churn Analysis`) with active session switching.
- **Real-Time Streaming**: Directly streams responses token-by-token from the backend Gemini 2.5 Pro API via SSE.
- **Action Toolbar**: Integrated controls for Model selection, System instructions, Code exports, and session resets.

### 5. `DeveloperIntelligenceBento.tsx` & `WorkflowNodeCanvas.tsx`
- **White Double-Bezel Bento**: Inspired by high-end developer tools (`Cursor`, `Fernand`, `Gumloop`, `Mintlify`, `Lightfield`).
  - *Nightly Regression Evals*: Automated evaluation runner showing test suites, 92.3% pass rate, and one-click "Promote to Production" button.
  - *LLM Cost & Error Rate*: Interactive cost calculator with slider to estimate token volume and error suppression.
  - *Live Code Sandbox*: Split-pane live code editor and real-time execution preview with instant console output.
  - *Interactive CLI Terminal Agent*: Functional interactive developer terminal executing `wavey --analyze`, `wavey --eval`, and `wavey --deploy`.
- **Workflow Node Canvas**: Visual drag-and-drop agent workflow builder connecting Triggers, LLM Reasoning nodes, Webhook dispatchers, and Sandbox runners with animated bezier connection curves.

### 6. `DeveloperFooter.tsx`
- Inspired by `cards inspiration/footer inspiration.jfif`.
- **Live Local Time Clock**: Real-time digital clock displaying UTC and local timestamp with ticking seconds.
- **Wireframe Emblem**: 3D geometric isometric SVG cube.
- **Luminous Wavey Banner**: Large illuminated brand display footer with navigation grid and social links.

### 7. `AuthModals.tsx`
- Implements `assests/sigin.png` and `assests/account create.png`.
- Supports Google OAuth2 flow, traditional email/password credentials, and a zero-friction **"Instant Guest Access"** button for immediate testing.

---

## 5. Backend Architecture & API Specifications

The backend is built with Express, TypeScript, and the official `@google/generative-ai` SDK.

### Configuration (`backend/src/config.ts`)
Loads and validates environment variables:
- `PORT`: Server listening port (default: `5000`).
- `GEMINI_API_KEY`: API key for Google Gemini model inference.
- `MONGODB_URI`: MongoDB connection URI.
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`: Google OAuth credentials.
- `JWT_SECRET`: Secret key for signing user authentication tokens.

### Database Strategy (`backend/src/db.ts`)
- **Primary**: Connects to MongoDB via Mongoose.
- **Resilient Fallback**: If MongoDB is unreachable or unconfigured, the system automatically initializes an **in-memory storage engine** with pre-seeded sessions and demo projects, ensuring the app always runs seamlessly without local database friction.

### REST & Streaming Endpoints

#### 1. Authentication (`/api/auth`)
- `GET /api/auth/google/url`: Returns Google OAuth consent screen URL.
- `GET /api/auth/google/callback`: Handles OAuth redirect and issues JWT.
- `POST /api/auth/login`: Email/password login.
- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/guest`: Instant guest authentication with seeded profile.
- `GET /api/auth/me`: Validates JWT token and returns authenticated user object.

#### 2. Real-Time Chat Streaming (`/api/chat`)
- `POST /api/chat/stream`: Initiates a Server-Sent Events (SSE) connection.
  - **Request Body**:
    ```json
    {
      "sessionId": "session-123",
      "message": "Build an Antigravity IDE workflow in TypeScript",
      "model": "gemini-2.5-pro",
      "tools": ["hubspot", "gmail", "drive"]
    }
    ```
  - **Response Stream (SSE)**:
    ```text
    data: {"text": "Certainly! Here is the architecture..."}
    data: {"text": " for the Antigravity engine."}
    data: {"done": true, "totalTokens": 384}
    ```

#### 3. Session Management (`/api/sessions`)
- `GET /api/sessions`: List all user sessions.
- `GET /api/sessions/:id`: Retrieve message history for a specific session.
- `POST /api/sessions`: Create a new session.
- `DELETE /api/sessions/:id`: Delete a session.

#### 4. Projects & Blueprints (`/api/projects`)
- `GET /api/projects`: List saved software projects.
- `POST /api/projects/generate`: Generate a full software architecture blueprint using Gemini.

---

## 6. How to Run, Test, and Build

### Prerequisites
- Node.js 18.x or higher
- `pnpm` 9.x or higher (strict requirement)

### Installation
```bash
# Install all monorepo dependencies
pnpm install --ignore-scripts
```

### Running Development Servers
```bash
# Start both Frontend (Vite) and Backend (Express) concurrently
pnpm dev

# Or start individually:
pnpm dev:backend   # Express backend on http://localhost:5000
pnpm dev:frontend  # Vite frontend on http://localhost:5173
```

### Production Build & Type Checking
```bash
# Build both frontend and backend
pnpm build

# Or build individually:
pnpm --filter wavey-backend build   # Compiles TypeScript with tsc
pnpm --filter wavey-frontend build  # Bundles frontend assets with vite build
```

---

## 7. Guidelines for Future AI Coding Agents

When working on this repository:
1. **Always use `pnpm`**: Never invoke `npm install`, `npm run`, or `yarn`.
2. **Never add fade-in or fade-out transitions**: Rely exclusively on translation, scale, kinetic oscillations, and double-bezel elevation.
3. **Never insert unicode emojis**: Always import clean vector SVG icons from `lucide-react`.
4. **Preserve brand colors**: Canvas background `#FDFDFD`, primary CTA `#5E1312`, card background `#FFFFFF`.
5. **Verify type safety**: Run `pnpm --filter wavey-backend build` and `pnpm --filter wavey-frontend build` before finishing any task to guarantee 0 compiler errors.
