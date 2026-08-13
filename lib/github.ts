import type { GitHubUser, GitHubRepo } from "@/types";

export async function getUser(
  username: string
): Promise<GitHubUser> {

  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (!response.ok) {
    throw new Error("User not found");
  }

  return response.json();
}

export async function getRepos(
  username: string
): Promise<GitHubRepo[]> {

  const allRepos: GitHubRepo[] = [];
  let page = 1;

  while (true) {

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Repositories not found");
    }

    const repos: GitHubRepo[] = await response.json();

    allRepos.push(...repos);

    if (repos.length < 100) {
      break;
    }

    page++;
  }

  return allRepos;
}