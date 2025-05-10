"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const scriptOutput = [
  "DocuBook CLI Installer",
  "✔ Enter your project directory name: docubook",
  "? Choose a package manager:",
  "> npm",
  "  pnpm",
  "  yarn",
  "  bun",
  "",
  ":: Cloning starter from GitLab...",
  "✔ Docubook project successfully created!",
  "Skipping rename postcss.config.js because Bun is not installed.",
  "",
  "[ DocuBook Version 1.8.0 ]",
  "",
  "Starting the installation process...",
  "Installation | ████████████████████████████████ | 100% 100/100",
  "",
  "Dependencies installed successfully using npm!",
  "",
  "┌────────────────────────────────────┐",
  "│ Next Steps:                        │",
  "│                                    │",
  "│ 1. Navigate to project directory:  │",
  "│    cd docubook                     │",
  "│                                    │",
  "│ 2. Install dependencies:           │",
  "│    npm install                     │",
  "│                                    │",
  "│ 3. Start the development server:   │",
  "│    npm run dev                     │",
  "└────────────────────────────────────┘"
];

export function RuntimeSimulator() {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (running) {
      setLogs([]);
      scriptOutput.forEach((line, index) => {
        setTimeout(() => {
          setLogs((prev) => [...prev, line]);
        }, index * 500);
      });
    }
  }, [running]);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-gray-900 text-green-400 font-mono rounded-lg overflow-hidden w-full h-auto max-w-2xl shadow-lg">
      <div className="bg-gray-800 text-gray-300 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-1">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <span className="ml-3">docubook@localhost</span>
      </div>
      <div ref={terminalRef} className="p-4 md:h-[400px] h-72 overflow-y-auto text-left">
        {logs.map((log, index) => (
          <pre key={index} className="whitespace-pre-wrap">{log}</pre>
        ))}
      </div>
      <div className="bg-gray-800 p-2 flex items-center space-x-2">
        <input
          type="text"
          value="npx @docubook/create@latest"
          readOnly
          className="bg-gray-700 text-gray-300 px-2 py-1 rounded w-full text-left"
        />
        <Button onClick={() => setRunning(true)} className="bg-green-600 hover:bg-green-500 px-4 py-1">
          <Play className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default RuntimeSimulator;
