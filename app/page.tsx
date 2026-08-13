"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import RepoList from "@/components/RepoList";
import CompareUsers from "@/components/CompareUsers";
import type { GitHubUser, GitHubRepo } from "@/types";
import { getUser, getRepos } from "@/lib/github";
import CompareResult from "@/components/CompareResult";
import Notes from "@/components/Notes";
import ProfileSummary from "@/components/ProfileSummary";

export default function Home() {
  

  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [compareUsername1, setCompareUsername1] = useState("");
  const [compareUsername2, setCompareUsername2] = useState("");

  const [compareUser1, setCompareUser1] = useState<GitHubUser | null>(null);
  const [compareUser2, setCompareUser2] = useState<GitHubUser | null>(null);

  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState("");

  async function searchUser() {

    setError("");

    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      return;
    }
    try
    {

      setLoading(true);

      const userData = await getUser(username);
      setUser(userData);

      const repoData = await getRepos(username);
      setRepos(repoData);

    }catch{
      setError("User not Found.");
      setUser(null);
      setRepos([]);
    }
    finally{
      setLoading(false);
    }
  } 

  async function compareUsers() {
  setCompareError("");

  if (
    !compareUsername1.trim() ||
    !compareUsername2.trim()
    ) {
    setCompareError("Please enter both usernames.");
    return;
    }

  try {
    setCompareLoading(true);

    const [user1, user2] = await Promise.all([
    getUser(compareUsername1),
    getUser(compareUsername2),
    ]);

    setCompareUser1(user1);
    setCompareUser2(user2);

  } catch {
    setCompareError("One or both users were not found.");
    setCompareUser1(null);
    setCompareUser2(null);
  } finally {
    setCompareLoading(false);
  }
}


  return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold">
              GitHub Profile Explorer
            </h1>

            <p className="text-gray-600 mt-3">
              Search GitHub users, explore repositories, compare profiles, and chat with AI about any repository.
            </p>
          </div>

          <div className="space-y-12">

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <SearchBar
                username={username}
                setUsername={setUsername}
                searchUser={searchUser}
              />
            </div>

            {loading && (
              <p className="text-center text-gray-600 my-6">
                Loading GitHub profile...
              </p>
            )}

            {error && (
              <p className="bg-red-100 text-red-700 rounded-lg p-3 my-6">
                {error}
              </p>
            )}

            {user && (
            <div className="space-y-6">
              <UserCard user={user} />

              <ProfileSummary
                user={user}
                repos={repos}
              />
            </div>
            )}

            {repos.length > 0 && (
              <div>
                <RepoList repos={repos} />
              </div>
            )}

            {/* Compare Section */}

            <div>
              <h2 className="text-3xl font-bold mb-6">
                Compare GitHub Users
              </h2>

            <CompareUsers
            username1={compareUsername1}
            username2={compareUsername2}
            setUsername1={setCompareUsername1}
            setUsername2={setCompareUsername2}
            compareUsers={compareUsers}
            />

            </div>

            {compareLoading && (
              <p className="text-center text-gray-600">
                Comparing users...
              </p>
            )}

            {compareError && (
              <p className="bg-red-100 text-red-700 rounded-lg p-3">
                {compareError}
              </p>
            )}

            
            {compareUser1 && compareUser2 && (
              <CompareResult
              user1={compareUser1}
              user2={compareUser2}
              />

          
  )}
          </div>
          </div>
       </div>

);
}

  