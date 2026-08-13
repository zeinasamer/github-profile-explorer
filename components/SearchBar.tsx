"use client";

type SearchBarProps = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  searchUser: () => void;
};

export default function SearchBar({
  username,
  setUsername,
  searchUser,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <input
        type="text"
        placeholder="Enter a GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchUser();
          }
        }}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        onClick={searchUser}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}