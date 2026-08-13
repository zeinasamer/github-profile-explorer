import type { GitHubRepo } from "@/types";
import Notes from "./Notes";
import AIChat from "./AIChat";

type RepoListProps = {
  repos: GitHubRepo[];
};

export default function RepoList({ repos }: RepoListProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Repositories
      </h2>

      {repos.map((repo) => (
      <div
        key={repo.id}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 mb-6"
      >
        <h3 className="text-2xl font-semibold">
          {repo.name}
        </h3>

        <p className="text-gray-600 mt-2">
          {repo.description || "No description available."}
        </p>

        <div className="flex gap-8 mt-4 text-gray-700">

          <p>⭐ {repo.stargazers_count}</p>

          <p>🍴 {repo.forks_count}</p>

        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-5 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800 transition"
        >
          View Repository
        </a>
    <div className="mt-6 border-t pt-6">
      <Notes noteKey={`repo-${repo.id}`} />
    </div>

    <div className="mt-6 border-t pt-6">
      <AIChat repo={repo} />
    </div>
  </div>
))}
    </div>
  );
}