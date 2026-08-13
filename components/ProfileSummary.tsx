"use client";

import { useState } from "react";
import type { GitHubUser, GitHubRepo } from "@/types";

type Props = {
  user: GitHubUser;
  repos: GitHubRepo[];
};

export default function ProfileSummary({ user, repos }: Props) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateSummary() {
    try {
      setLoading(true);

      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, repos }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary.");
      }

      const data = await response.json();

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI summary.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          AI Profile Summary
        </h2>

        <button
          onClick={generateSummary}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>

      {summary && (
        <div className="mt-6 rounded-lg bg-gray-50 p-5">
          <p className="whitespace-pre-wrap leading-7 text-gray-700">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}