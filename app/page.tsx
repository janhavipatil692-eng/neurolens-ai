"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function initializeAgent() {
    try {
      setLoading(true);

      const response = await fetch("/api/agent/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persona: {
            name: "NeuroLens",
            domain: "AI Technology",
          },
        }),
      });

      const data = await response.json();

      // Agent may already exist — dashboard can still be opened
      if (response.ok || response.status === 409) {
        router.push("/dashboard");
        return;
      }

      throw new Error(data.error || "Failed to initialize agent");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to initialize NeuroLens"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold">
        NeuroLens AI
      </h1>

      <p className="mt-6 text-xl text-gray-400 text-center max-w-2xl">
        Autonomous AI Technology Analyst
      </p>

      <button
        onClick={initializeAgent}
        disabled={loading}
        className="mt-10 rounded-xl bg-white px-8 py-4 text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50"
      >
        {loading ? "Initializing..." : "Initialize Agent"}
      </button>
    </main>
  );
}