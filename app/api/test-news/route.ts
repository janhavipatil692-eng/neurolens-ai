import { NextResponse } from "next/server";
import { discoverTopics } from "../../../services/newsService";
import { judgeTopic } from "../../../services/editorialJudge";
export async function GET() {
  try {
    const topics = await discoverTopics();

    if (topics.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No topics discovered",
        topics: [],
      });
    }

    const topic = topics[0];

    const decision = await judgeTopic(topic);

    return NextResponse.json({
      success: true,
      topic,
      editorialDecision: decision,
    });
  } catch (error) {
    console.error("Test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to test editorial system",
      },
      { status: 500 }
    );
  }
}