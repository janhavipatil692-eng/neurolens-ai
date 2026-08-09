import { NextResponse } from "next/server";
import { saveMemory, searchMemory } from "@/services/breethService";

export async function GET() {
  try {
    const memoryText =
      "NeuroLens is an autonomous AI technology persona that discovers current technology topics, evaluates their importance, and publishes an evolving feed.";

    const saved = await saveMemory(memoryText);

    const results = await searchMemory(
      "NeuroLens autonomous AI technology persona"
    );

    return NextResponse.json({
      success: true,
      saved,
      searchResults: results,
    });
  } catch (error) {
    console.error("BREETH TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}