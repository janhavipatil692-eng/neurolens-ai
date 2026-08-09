import { NextResponse } from "next/server";
import { judgeTopic } from "@/services/editorialJudge";

export async function GET() {
  try {
    const topic = {
      title: "OpenAI releases a new AI reasoning benchmark",
      description:
        "A new benchmark evaluates how well AI systems reason across difficult technical tasks.",
      url: "https://example.com/ai-benchmark",
      publishedAt: new Date().toISOString(),
      source: "Tech News",
    };

    const decision = await judgeTopic(topic);

    return NextResponse.json({
      success: true,
      topic,
      editorialDecision: decision,
    });
  } catch (error) {
    console.error("EDITORIAL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}