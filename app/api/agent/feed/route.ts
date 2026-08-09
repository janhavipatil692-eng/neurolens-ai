import { NextResponse } from "next/server";
import { getAgent } from "@/lib/agentStore";
import fs from "fs";
import path from "path";

const postsFile = path.join(process.cwd(), "data", "posts.json");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get("agentId");

    if (!agentId) {
      return NextResponse.json(
        { error: "agentId is required" },
        { status: 400 }
      );
    }

    const agent = getAgent();

    if (!agent.agentId || agent.agentId !== agentId) {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 }
      );
    }

    const fileData = fs.readFileSync(postsFile, "utf-8");
    const posts = JSON.parse(fileData);

    posts.sort(
      (a: { createdAt: string }, b: { createdAt: string }) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ posts });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to retrieve feed" },
      { status: 500 }
    );
  }
}