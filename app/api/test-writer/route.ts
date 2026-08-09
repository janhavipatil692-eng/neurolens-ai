import { NextResponse } from "next/server";
import { writePost } from "@/services/postWriter";

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

    const post = await writePost(topic);

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("WRITER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}