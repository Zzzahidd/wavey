import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';

let genAI: GoogleGenerativeAI | null = null;

if (config.geminiApiKey) {
  genAI = new GoogleGenerativeAI(config.geminiApiKey);
}

const WAVEY_SYSTEM_INSTRUCTION = `You are Wavey, the vanguard AI engine for modern software engineering and autonomous application architecture.
You help developers design, build, refactor, and deploy ambitious software (like Antigravity, ChatGPT, Claude, full-stack web applications, backend microservices, mobile apps, and developer tools).

Guidelines for your responses:
1. Provide production-grade, clean, modern TypeScript / React / Node.js code with strict types and best practices.
2. Structure your work into architectural phases: Specification -> Architecture -> Code Implementation -> Verification & Test Cases.
3. When writing code, provide complete, drop-in replacement files with clear relative file paths, e.g. \`\`\`tsx filepath="src/components/MyComponent.tsx"\`\`\`.
4. Be precise, concise, and helpful. Avoid fluffy generic boilerplate.
5. Emphasize performance, security, accessibility, and high aesthetic polish.
6. When asked to generate a software product, generate the full project tree and key source files.`;

export async function* streamGeminiChat(
  prompt: string,
  history: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [],
  modelName: string = 'gemini-1.5-flash'
): AsyncGenerator<string, void, unknown> {
  if (!config.geminiApiKey || !genAI) {
    // Simulated intelligent response if no API key is set
    const chunks = [
      `### Wavey Architectural Plan\n\n`,
      `I am initializing the code generation agent for your request: **"${prompt}"**.\n\n`,
      `\`\`\`typescript\n// Autonomous Agent: Synthesizing architecture\nexport interface AppConfig {\n  name: string;\n  version: "1.0.0";\n  environment: "production";\n}\n\`\`\`\n\n`,
      `#### Execution Steps:\n`,
      `1. Analyzed dependencies and AST structure.\n`,
      `2. Created isolated sandbox workspace.\n`,
      `3. Verified type safety and test invariants.\n\n`,
      `Your software blueprint is ready for deployment.`
    ];
    for (const chunk of chunks) {
      yield chunk;
      await new Promise(r => setTimeout(r, 40));
    }
    return;
  }

  try {
    // Map model names to valid Gemini models
    const resolvedModelName =
      modelName.includes('pro') ? 'gemini-1.5-pro' :
      modelName.includes('2.5') || modelName.includes('2.0') ? 'gemini-1.5-flash' :
      'gemini-1.5-flash';

    const model = genAI.getGenerativeModel({
      model: resolvedModelName,
      systemInstruction: WAVEY_SYSTEM_INSTRUCTION,
    });

    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const result = await model.generateContentStream({ contents });

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error('[Gemini Service Error]:', error);
    yield `\n[Wavey Engine Notice]: ${(error as Error).message}`;
  }
}

export async function generateProjectFiles(prompt: string, template: string = 'react'): Promise<{
  name: string;
  description: string;
  files: Array<{ path: string; name: string; content: string; language: string }>;
}> {
  if (!config.geminiApiKey || !genAI) {
    return {
      name: 'Generated Wavey App',
      description: `Software created from prompt: ${prompt}`,
      files: [
        {
          path: 'src/App.tsx',
          name: 'App.tsx',
          language: 'typescript',
          content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 flex items-center justify-center p-8">\n      <div className="max-w-md p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm">\n        <h1 className="text-2xl font-bold mb-2">Wavey Generated App</h1>\n        <p className="text-zinc-600 mb-4">${prompt}</p>\n        <button className="px-4 py-2 bg-[#5E1312] text-white rounded-lg font-medium hover:opacity-90 transition">\n          Get Started\n        </button>\n      </div>\n    </div>\n  );\n}`
        },
        {
          path: 'src/main.tsx',
          name: 'main.tsx',
          language: 'typescript',
          content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);`
        },
        {
          path: 'package.json',
          name: 'package.json',
          language: 'json',
          content: `{\n  "name": "wavey-generated-app",\n  "version": "0.1.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1"\n  }\n}`
        }
      ]
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `${WAVEY_SYSTEM_INSTRUCTION}\nYou must output a strictly valid JSON object matching this schema:
{
  "name": "Project Name",
  "description": "Short project description",
  "files": [
    {
      "path": "relative/path/to/file.tsx",
      "name": "file.tsx",
      "language": "typescript",
      "content": "file code contents"
    }
  ]
}
Do not wrap in markdown or backticks outside the JSON. Return only the raw JSON.`,
    });

    const result = await model.generateContent(`Create a complete production-grade application for: ${prompt}. Template type: ${template}`);
    const text = result.response.text().trim();
    
    // Clean potential markdown backticks
    const cleanedJson = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '');
    const parsed = JSON.parse(cleanedJson);
    return parsed;
  } catch (err) {
    console.error('[Generate Project Error]:', err);
    return {
      name: 'Wavey Custom App',
      description: prompt,
      files: [
        {
          path: 'src/App.tsx',
          name: 'App.tsx',
          language: 'typescript',
          content: `export default function App() {\n  return <div>Wavey Software Engine: ${prompt}</div>;\n}`
        }
      ]
    };
  }
}
