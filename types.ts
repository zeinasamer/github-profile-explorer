export type GitHubUser = {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;

  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;

  company: string | null;
  location: string | null;

  created_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};