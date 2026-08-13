import type { GitHubUser } from "@/types";
import Notes from "./Notes";

type UserCardProps = {
  user: GitHubUser;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-8">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-36 h-36 rounded-full border-4 border-gray-200"
        />

        <h2 className="text-3xl font-bold mt-4">
          {user.name || user.login}
        </h2>

        <p className="text-gray-500 text-lg">
          @{user.login}
        </p>

        {user.bio && (
          <p className="mt-4 text-gray-700">
            {user.bio}
          </p>
        )}

        <div className="grid grid-cols-3 gap-6 mt-8 text-center">

          <div>
            <p className="text-2xl font-bold">
              {user.followers}
            </p>
            <p className="text-gray-500">
              Followers
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">
              {user.following}
            </p>
            <p className="text-gray-500">
              Following
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">
              {user.public_repos}
            </p>
            <p className="text-gray-500">
              Repositories
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8 w-full">
          <Notes noteKey={`user-${user.login}`} />
      </div>

    </div>
  );
}