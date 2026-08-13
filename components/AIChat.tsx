"use client";

import { useEffect, useState } from "react";
import type { GitHubRepo } from "@/types";

type AIChatProps = {
  repo: GitHubRepo;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChat({ repo }: AIChatProps) {
  const storageKey = `chat-${repo.id}`;
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {
  localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  useEffect(() => {
  const saved = localStorage.getItem(storageKey);
  setMessages(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  async function askAI() {
    if (!question.trim()) return;

  const userMessage: Message = {
    role: "user",
    content: question,
  };

  const conversation = [
    ...messages,
    userMessage,
  ];

  setLoading(true);

  const assistantMessage: Message = {
  role: "assistant",
  content: "",
};

setMessages([...conversation, assistantMessage]);

try {

  const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    repo,
    messages: conversation,
  }),
});

if (!response.ok) {
  return;
}

// Create a reader for the stream
const reader = response.body?.getReader();

if (!reader) {
  return;
}

const decoder = new TextDecoder();

// Start reading the stream
let aiResponse = "";

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  aiResponse += decoder.decode(value, { stream: true });

  setMessages([
    ...conversation,
    {
      role: "assistant",
      content: aiResponse,
    },
  ]);
} 
aiResponse += decoder.decode();
}catch(error){
  console.error(error);
} finally {
  setQuestion("");
  setLoading(false);
}
  }
  return (
    <div className="mt-6 rounded-xl border bg-white shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">
        🤖 Repository AI Chat
      </h3>

      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something about this repository..."
        className="w-full rounded-lg border p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <br />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-3 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
    </div>
  );
}