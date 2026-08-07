export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold">
        NeuroLens AI
      </h1>

      <p className="mt-6 text-xl text-gray-400 text-center max-w-2xl">
        Autonomous AI Technology Analyst
      </p>

      <button className="mt-10 rounded-xl bg-white px-8 py-4 text-black font-semibold hover:bg-gray-200 transition">
        Initialize Agent
      </button>
    </main>
  );
}