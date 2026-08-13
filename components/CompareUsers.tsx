type CompareUsersProps = {
  username1: string;
  username2: string;

  setUsername1: React.Dispatch<React.SetStateAction<string>>;
  setUsername2: React.Dispatch<React.SetStateAction<string>>;

  compareUsers: () => void;
};

export default function CompareUsers({
  username1,
  username2,
  setUsername1,
  setUsername2,
  compareUsers,
}: CompareUsersProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        Compare Two GitHub Users
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First username"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Second username"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
          className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={compareUsers}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Compare Users
      </button>
    </div>
  );
}