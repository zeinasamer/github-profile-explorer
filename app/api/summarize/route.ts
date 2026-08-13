import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { user, repos } = body;

    const prompt = `
Analyze this GitHub profile.

Username: ${user.login}
Name: ${user.name}
Followers: ${user.followers}
Following: ${user.following}
Public repositories: ${user.public_repos}

Repositories:

${repos
  .map(
    (repo: any) =>
      `- ${repo.name}: ${repo.description ?? "No description"} (⭐ ${repo.stargazers_count})`
  )
  .join("\n")}

Write:
1. A short summary.
2. Main technologies/interests.
3. Strengths.
4. Interesting repositories.
`;

    const completion = await client.chat.completions.create({
      model: "google/gemma-4-26b-a4b-it:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Summary generation failed:", error);

    return NextResponse.json(
      {
        error: "Failed to generate summary.",
      },
      {
        status: 500,
      }
    );
  }
}