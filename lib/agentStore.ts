import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "agent.json");

export interface StoredAgent {
  agentId: string | null;
  status: "running" | "stopped";
  persona: {
    name: string;
    domain: string;
  } | null;
  initializedAt: string | null;
  totalPosts: number;
  totalRejected: number;
}

export function getAgent(): StoredAgent {
  const data = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(data);
}

export function saveAgent(agent: StoredAgent): void {
  fs.writeFileSync(
    filePath,
    JSON.stringify(agent, null, 2),
    "utf-8"
  );
}