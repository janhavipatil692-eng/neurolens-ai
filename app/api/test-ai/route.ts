import { NextResponse } from "next/server";
import { askAI } from "@/services/aiService";

export async function GET() {
  try {
    const result = await askAI(
      "Give me one interesting AI technology topic worth publishing about today. Return only the topic and one sentence explaining why it matters."
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}