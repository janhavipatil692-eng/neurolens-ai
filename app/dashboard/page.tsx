"use client";

import { useState } from "react";

interface Post {
  title: string;
  summary: string;
  analysis: string;
  whyItMatters: string;
  sourceUrl: string;
  source: string;
}

interface AgentResult {
  topic: {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: string;
  };
  status: string;
  score: number;
  reason: string;
  post?: Post;
}

export default function Dashboard() {
  const [results, setResults] = useState<AgentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Click Run Agent to discover and analyze the latest AI news."
  );

  async function runAgent() {
    try {
      setLoading(true);
      setMessage("NeuroLens is discovering and analyzing news...");

      const response = await fetch("/api/agent/run");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Agent failed");
      }

      setResults(data.results || []);

      setMessage(
        `NeuroLens processed ${data.processed || 0} topic${
          data.processed === 1 ? "" : "s"
        } successfully.`
      );
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while running NeuroLens."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Autonomous AI Intelligence
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              NeuroLens
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              An autonomous AI technology agent that discovers, evaluates,
              writes and remembers important technology news.
            </p>
          </div>

          {/* Agent status */}
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>

              <div>
                <p className="font-semibold text-green-400">
                  Agent Running
                </p>

                <p className="text-xs text-gray-500">
                  NeuroLens online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Control panel */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Autonomous News Agent
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Discover → Remember → Judge → Write → Save
              </p>
            </div>

            <button
              onClick={runAgent}
              disabled={loading}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "🤖 Agent Working..." : "▶ Run NeuroLens"}
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-sm text-gray-400">{message}</p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">Topics Processed</p>
            <p className="mt-2 text-3xl font-bold">{results.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">Published</p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {
                results.filter(
                  (result) => result.status === "published"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {results.length > 0
                ? (
                    results.reduce(
                      (total, result) => total + result.score,
                      0
                    ) / results.length
                  ).toFixed(1)
                : "—"}
            </p>
          </div>
        </section>

        {/* News feed */}
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Intelligence Feed
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Latest NeuroLens Analysis
            </h2>
          </div>

          {results.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
              <div className="text-5xl">🧠</div>

              <h3 className="mt-5 text-xl font-semibold">
                No intelligence generated yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Run the NeuroLens agent to discover current AI and technology
                topics.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((result, index) => (
                <article
                  key={`${result.topic.title}-${index}`}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition hover:border-cyan-400/30"
                >
                  <div className="p-6 md:p-8">
                    {/* Topic header */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              result.status === "published"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {result.status === "published"
                              ? "✓ PUBLISHED"
                              : "REJECTED"}
                          </span>

                          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                            AI Score: {result.score}/10
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold leading-tight md:text-3xl">
                          {result.post?.title || result.topic.title}
                        </h3>
                      </div>

                      <div className="shrink-0 rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-center">
                        <p className="text-xs text-gray-500">EDITORIAL</p>
                        <p className="text-2xl font-bold text-cyan-400">
                          {result.score}/10
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    {result.post && (
                      <>
                        <div className="mt-6">
                          <p className="text-lg leading-8 text-gray-300">
                            {result.post.summary}
                          </p>
                        </div>

                        {/* Analysis */}
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                            <h4 className="font-semibold text-cyan-400">
                              🔍 NeuroLens Analysis
                            </h4>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                              {result.post.analysis}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                            <h4 className="font-semibold text-purple-400">
                              💡 Why It Matters
                            </h4>

                            <p className="mt-3 text-sm leading-7 text-gray-400">
                              {result.post.whyItMatters}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Editorial reason */}
                    <div className="mt-6 border-l-2 border-cyan-400/40 pl-4">
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Editorial Decision
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        {result.reason}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                      <span>
                        📰 {result.post?.source || result.topic.source}
                      </span>

                      {result.post?.sourceUrl || result.topic.url ? (
                        <a
                          href={
                            result.post?.sourceUrl || result.topic.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-cyan-400 hover:text-cyan-300"
                        >
                          Read Original →
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 py-8 text-center">
          <p className="text-sm text-gray-600">
            NeuroLens • Autonomous AI Technology Intelligence
          </p>

          <p className="mt-2 text-xs text-gray-700">
            Discover • Evaluate • Explain • Remember
          </p>
        </footer>
      </div>
    </main>
  );
}