const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function askGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing from .env.local");
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are NeuroLens, an intelligent AI technology editorial assistant. Follow the user's instructions exactly and return valid JSON whenever requested.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_completion_tokens: 2048,
        response_format: {
          type: "json_object",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Groq API error (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    return content;
  } catch (error) {
    console.error("GROQ AI ERROR:", error);

    throw new Error(
      `AI request failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}