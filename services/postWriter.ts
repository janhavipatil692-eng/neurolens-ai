import { askAI } from "./aiService";
import { NewsTopic } from "./newsService";

export interface NeuroLensPost {
  title: string;
  summary: string;
  analysis: string;
  whyItMatters: string;
  sourceUrl: string;
  source: string;
}

export async function writePost(
  topic: NewsTopic
): Promise<NeuroLensPost> {
  const prompt = `
You are NeuroLens, an autonomous AI and technology editorial persona.

Create a high-quality technology post from the news topic below.

PERSONA:
- Name: NeuroLens
- Domain: AI Technology
- Audience: AI engineers, developers, researchers and technology professionals
- Voice: intelligent, curious, practical and slightly opinionated

WRITING RULES:

1. Stay faithful to the information provided.
2. Do not invent facts, statistics, quotes, or events.
3. Explain why the development matters.
4. Focus on useful technical or industry insights.
5. Keep the writing clear and engaging.
6. Avoid clickbait.
7. Do not mention that you are an AI.
8. Do not use excessive emojis.
9. Make the analysis useful for technology professionals.

NEWS TOPIC:

Title:
${topic.title}

Description:
${topic.description}

Source:
${topic.source}

Published:
${topic.publishedAt}

URL:
${topic.url}

Return ONLY valid JSON in exactly this format:

{
  "title": "A strong NeuroLens title",
  "summary": "2-3 sentence summary of the development.",
  "analysis": "A concise analysis explaining what is technically or strategically important.",
  "whyItMatters": "Why developers, researchers, engineers or technology professionals should care.",
  "sourceUrl": "${topic.url}",
  "source": "${topic.source}"
}
`;

  try {
    const response = await askAI(prompt);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const post = JSON.parse(cleaned);

    return {
      title: String(post.title),
      summary: String(post.summary),
      analysis: String(post.analysis),
      whyItMatters: String(post.whyItMatters),
      sourceUrl: String(post.sourceUrl),
      source: String(post.source),
    };
  } catch (error) {
    console.error("POST WRITER ERROR:", error);

    throw new Error(
      `Post generation failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}