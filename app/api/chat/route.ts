import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

async function getReadme(owner: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw+json",
        },
      }
    );

    if (!response.ok) {
      return "No README available.";
    }

    return await response.text();
  } catch {
    return "No README available.";
  }
}

async function getFileStructure(owner: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents`
    );

    if (!response.ok) {
      return [];
    }

    const files = await response.json();

    return files.map((file: { name: string }) => file.name);
  } catch {
    return [];
  }
}

async function getRecentCommits(
  owner: string,
  repo: string
  ): Promise<{ author: string; message: string }[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`
    );

    if (!response.ok) {
      return [];
    }

    const commits = await response.json();

    return commits.map(
  (commit: {
    commit: {
      message: string;
      author: { name: string };
    };
  }) => ({
    message: commit.commit.message,
    author: commit.commit.author.name,
  })
  );
  } catch {
    return [];
  }
}

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    });

export async function POST(request: NextRequest) {

  try {
    const {
    repo,
    messages,
  }: {
    repo: any;
    messages: {
      role: "user" | "assistant";
      content: string;
    }[];
  } = await request.json();

    const owner = repo.owner.login;
    const repoName = repo.name;

    const readme = await getReadme(owner, repoName);
    const files = await getFileStructure(owner, repoName);
    const commits = await getRecentCommits(owner, repoName);

const repositoryContext = `
Repository: ${repo.full_name}

Description:
${repo.description}

README:
${readme}

Files:
${files.join("\n")}

Recent commits:
${commits
  .map(commit => `${commit.author}: ${commit.message}`)
  .join("\n")}
  `;


    const completion = await client.chat.completions.create({
      model: "google/gemma-4-26b-a4b-it:free",
      stream: true,
       messages: [
      {
        role: "system",
        content:
          "You answer questions about GitHub repositories. Use ONLY the repository information provided.",
      },

      {
        role: "system",
        content: repositoryContext,
      },

      ...messages,
    ],
    });

    const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || "";

          controller.enqueue(encoder.encode(text));
        }
      }finally {
        controller.close();
      }

    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to answer question." },
      { status: 500 }
    );
  }
}