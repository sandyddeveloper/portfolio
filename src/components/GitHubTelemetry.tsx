'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Activity, GitCommit, GitBranch, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface GHUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  bio: string;
  created_at: string;
}

interface CommitEvent {
  id: string;
  repoName: string;
  sha: string;
  branch: string;
  date: string;
  rawDate: string;
  type: string;
}

export function GitHubTelemetry() {
  const { theme } = useTheme();
  const [user, setUser] = useState<GHUser | null>(null);
  const [commitList, setCommitList] = useState<CommitEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveGitHubData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [uRes, eRes] = await Promise.all([
        fetch('https://api.github.com/users/sandyddeveloper'),
        fetch('https://api.github.com/users/sandyddeveloper/events/public?per_page=30')
      ]);

      if (uRes.ok) {
        const uData = await uRes.json();
        setUser(uData);
      } else {
        setError('Unable to fetch GitHub user profile');
      }

      if (eRes.ok) {
        const events = await eRes.json();
        if (Array.isArray(events)) {
          const parsedCommits: CommitEvent[] = events
            .filter((e: { type: string }) => e.type === 'PushEvent' || e.type === 'CreateEvent')
            .map((e: { id: string; repo: { name: string }; payload: { head?: string }; created_at: string; type: string }) => ({
              id: e.id,
              repoName: e.repo.name.replace('sandyddeveloper/', ''),
              sha: e.payload?.head ? e.payload.head.substring(0, 7) : 'main',
              branch: 'main',
              date: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              rawDate: e.created_at,
              type: e.type === 'PushEvent' ? 'Commit Push' : 'Repository Branch',
            }));
          setCommitList(parsedCommits);
        }
      } else {
        setError('Unable to fetch GitHub activity events');
      }
    } catch {
      setError('Network error connecting to GitHub API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveGitHubData();
  }, [fetchLiveGitHubData]);

  return (
    <section id="telemetry" className="space-y-6 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
              Dynamic GitHub API Telemetry • @sandyddeveloper
            </span>
            <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-600 font-mono flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              100% LIVE DATA
            </span>
          </div>
          <h2 className={`text-2xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
            Real GitHub Activity & Commit Feed
          </h2>
        </div>

        <button
          onClick={fetchLiveGitHubData}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-600 hover:text-purple-800 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Live API</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid gap-5 md:grid-cols-12">
        {/* User Dynamic Profile & Live Activity Card (4 Cols) */}
        <div className={`md:col-span-4 flex flex-col justify-between rounded-2xl border p-6 shadow-sm backdrop-blur-xl transition-all ${
          theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80 text-slate-100' : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/10'
        }`}>
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-slate-400 space-y-2">
              <RefreshCw className="h-5 w-5 animate-spin text-purple-600 mx-auto" />
              <p>Fetching Live GitHub API Data...</p>
            </div>
          ) : user ? (
            <div className="space-y-5">
              {/* User Avatar & Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border-2 border-purple-400/40 text-purple-600 shadow-sm shadow-purple-500/20">
                  <GithubIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{user.name || user.login}</h3>
                  <a href={user.html_url} target="_blank" rel="noreferrer" className="text-xs font-mono font-bold text-purple-600 hover:underline">
                    @{user.login}
                  </a>
                </div>
              </div>

              {user.bio && (
                <p className={`text-xs leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                  {user.bio}
                </p>
              )}

              {/* Dynamic GitHub Metrics */}
              <div className={`space-y-2.5 pt-3 border-t font-mono text-xs ${
                theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-700 font-bold'}>Public Repositories:</span>
                  <span className="font-extrabold text-purple-600">{user.public_repos} Repos</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-700 font-bold'}>Followers:</span>
                  <span className="font-extrabold text-emerald-600">{user.followers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-700 font-bold'}>Recent Public Events:</span>
                  <span className="font-extrabold text-purple-600">{commitList.length} Events</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-700 font-bold'}>Member Since:</span>
                  <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>
                    {new Date(user.created_at).getFullYear()}
                  </span>
                </div>
              </div>

              {/* Heatmap Matrix */}
              <div className={`space-y-2 pt-3 border-t ${theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'}`}>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={`flex items-center gap-1 font-bold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                    <Activity className="h-3.5 w-3.5 text-purple-600" /> Recent Event Matrix
                  </span>
                  <span className="text-emerald-600 font-extrabold">{commitList.length} Active</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 14 }).map((_, idx) => {
                    const hasEvent = idx < commitList.length;
                    return (
                      <div
                        key={idx}
                        className={`h-5 rounded-md transition-all ${
                          hasEvent
                            ? 'bg-purple-600 shadow-sm shadow-purple-500/40 scale-105'
                            : theme === 'dark' ? 'bg-slate-800/60' : 'bg-purple-100'
                        }`}
                        title={hasEvent ? `Live GitHub Event #${idx + 1}` : 'No public activity'}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs font-mono text-slate-500">{error || 'No profile data'}</p>
          )}

          <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
            theme === 'dark' ? 'border-purple-900/30 text-slate-400' : 'border-purple-100 text-slate-700 font-bold'
          }`}>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> API Dynamic
            </span>
            <span className="text-purple-600 font-bold">GitHub v3</span>
          </div>
        </div>

        {/* Real Live Commit Stream (8 Cols) */}
        <div className={`md:col-span-8 flex flex-col justify-between rounded-2xl border p-6 shadow-sm backdrop-blur-xl transition-all ${
          theme === 'dark' ? 'border-purple-900/40 bg-slate-950/80 text-slate-100' : 'border-purple-200 bg-white text-slate-950 shadow-purple-500/10'
        }`}>
          <div>
            <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
              theme === 'dark' ? 'border-purple-900/30' : 'border-purple-100'
            }`}>
              <div className="flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-purple-600" />
                <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Dynamic Live Commit & Event Stream</h3>
              </div>
              <span className="text-[10px] font-mono text-purple-600 font-bold">Real-Time GitHub Events</span>
            </div>

            {loading ? (
              <div className="py-16 text-center text-xs font-mono text-slate-400 space-y-2">
                <RefreshCw className="h-5 w-5 animate-spin text-purple-600 mx-auto" />
                <p>Loading Live Commits from API...</p>
              </div>
            ) : commitList.length === 0 ? (
              <div className="py-12 text-center text-xs font-mono text-slate-500">
                No recent public commit events found on GitHub.
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {commitList.map((c) => (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between rounded-xl border p-3 font-mono transition-all ${
                      theme === 'dark'
                        ? 'border-purple-900/40 bg-slate-900/40 hover:border-purple-500/30'
                        : 'border-purple-200 bg-purple-50/40 text-slate-950 hover:border-purple-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-md bg-purple-100 border border-purple-300 px-2 py-1 text-[11px] font-extrabold text-purple-800">
                        {c.sha}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                            {c.repoName}
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-purple-600 font-bold">
                            <GitBranch className="h-3 w-3 text-purple-600" /> {c.branch}
                          </span>
                        </div>
                        <span className={`text-[10px] block mt-0.5 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {c.type}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-3 w-3" /> Live Event
                      </span>
                      <span className={`text-[10px] block font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>{c.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono ${
            theme === 'dark' ? 'border-purple-900/30 text-slate-400' : 'border-purple-100 text-slate-700 font-bold'
          }`}>
            <span>Fetched directly via GitHub REST API</span>
            <a
              href="https://github.com/sandyddeveloper?tab=overview"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1 font-bold"
            >
              View Profile on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
