import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getAgent, saveAgent } from "@/lib/agentStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const persona = body?.persona;

    if (!persona?.name || !persona?.domain) {
      return NextResponse.json(
        {
          error: "Persona name and domain are required",
        },
        { status: 400 }
      );
    }

    const existingAgent = getAgent();

    // Prevent accidental second initialization
    if (existingAgent.agentId) {
      return NextResponse.json(
        {
          error: "Agent has already been initialized",
          agentId: existingAgent.agentId,
        },
        { status: 409 }
      );
    }

    const agentId = uuidv4();

    const agent = {
      agentId,
      status: "running" as const,
      persona: {
        name: persona.name,
        domain: persona.domain,
      },
      initializedAt: new Date().toISOString(),
      totalPosts: 0,
      totalRejected: 0,
    };

    saveAgent(agent);

    console.log("🤖 Agent initialized:", agentId);

    return NextResponse.json({
      agentId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to initialize agent",
      },
      { status: 500 }
    );
  }
}