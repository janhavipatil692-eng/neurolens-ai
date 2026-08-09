import axios from "axios";

const BREETH_API_URL = "https://api.thebreeth.com/v1";

function getApiKey(): string {
  const key = process.env.BREETH_API_KEY;

  if (!key) {
    throw new Error("BREETH_API_KEY is missing from .env.local");
  }

  return key;
}

const headers = () => ({
  Authorization: `Bearer ${getApiKey()}`,
  "Content-Type": "application/json",
});

export async function saveMemory(content: string) {
  try {
    const response = await axios.post(
      `${BREETH_API_URL}/episodes`,
      {
        content,
        group_id: "neurolens",
        extract_intent: true,
      },
      {
        headers: headers(),
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "BREETH WRITE ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      `Breeth write failed: ${
        error.response?.data
          ? JSON.stringify(error.response.data)
          : error.message
      }`
    );
  }
}

export async function searchMemory(query: string, limit = 5) {
  try {
    const response = await axios.post(
      `${BREETH_API_URL}/search`,
      {
        query,
        limit,
      },
      {
        headers: headers(),
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "BREETH SEARCH ERROR:",
      error.response?.data || error.message
    );

    throw new Error(
      `Breeth search failed: ${
        error.response?.data
          ? JSON.stringify(error.response.data)
          : error.message
      }`
    );
  }
}