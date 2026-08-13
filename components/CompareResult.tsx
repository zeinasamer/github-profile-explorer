import type { GitHubUser } from "@/types";

type CompareResultProps = {
  user1: GitHubUser;
  user2: GitHubUser;
};

function getWinner(value1: number, value2: number) {
  if (value1 > value2) {
    return <span className="text-green-600 font-semibold">🏆 User 1</span>;
  }

  if (value2 > value1) {
    return <span className="text-green-600 font-semibold">🏆 User 2</span>;
  }

  return <span className="text-yellow-600">🤝 Tie</span>;
}

export default function CompareResult({
  user1,
  user2,
}: CompareResultProps) {
    return (
  <div className="mt-10 rounded-xl bg-white shadow-md p-8">
    <h2 className="text-3xl font-bold mb-6">
      GitHub Profile Comparison
    </h2>
    
    <div className="overflow-x-auto">
      <table>
        <thead className="bg-gray-100">
          <tr className="border-b hover:bg-gray-50 transition">
            <th className="px-6 py-3 text-left font-semibold">Metric</th>
            <th className="px-6 py-3 text-left font-semibold text-blue-600">
              {user1.login}
            </th>
            <th className="px-6 py-3 text-left font-semibold text-blue-600">
              {user2.login}
            </th>
            <th className="px-6 py-3 text-left font-semibold">Winner</th>
          </tr>
        </thead>

        <tbody>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Followers</td>
            <td className="px-6 py-4">{user1.followers}</td>
            <td className="px-6 py-4">{user2.followers}</td>
            <td className="px-6 py-4">{getWinner(user1.followers, user2.followers)}</td>
          </tr>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Following</td>
            <td className="px-6 py-4">{user1.following}</td>
            <td className="px-6 py-4">{user2.following}</td>
            <td className="px-6 py-4">{getWinner(user1.following, user2.following)}</td>
          </tr>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Public Repositories</td>
            <td className="px-6 py-4">{user1.public_repos}</td>
            <td className="px-6 py-4">{user2.public_repos}</td>
            <td className="px-6 py-4">{getWinner(user1.public_repos, user2.public_repos)}</td>
          </tr>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Public Gists</td>
            <td className="px-6 py-4">{user1.public_gists}</td>
            <td className="px-6 py-4">{user2.public_gists}</td>
            <td className="px-6 py-4 text-center">{getWinner(user1.public_gists, user2.public_gists)}</td>
          </tr>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Company</td>
            <td className="px-6 py-4">{user1.company || "N/A"}</td>
            <td className="px-6 py-4">{user2.company || "N/A"}</td>
            <td className="px-6 py-4">-</td>
          </tr>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Location</td>
            <td className="px-6 py-4">{user1.location || "N/A"}</td>
            <td className="px-6 py-4">{user2.location || "N/A"}</td>
            <td className="px-6 py-4">-</td>
          </tr>

          <tr className="border-b hover:bg-gray-50 transition">
            <td className="px-6 py-4">Joined GitHub</td>
            <td className="px-6 py-4">{new Date(user1.created_at).toLocaleDateString()}</td>
            <td className="px-6 py-4">{new Date(user2.created_at).toLocaleDateString()}</td>
            <td className="px-6 py-4">-</td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
);
}