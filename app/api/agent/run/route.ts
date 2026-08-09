import { NextResponse } from "next/server";

import { discoverTopics } from "@/services/newsService";
import { judgeTopic } from "@/services/editorialJudge";
import { writePost } from "@/services/postWriter";
import {
  searchMemory,
  saveMemory,
} from "@/services/breethService";

export async function GET() {
  try {
    console.log("🤖 NeuroLens agent started");

    // --------------------------------------------------
    // STEP 1: Discover latest technology news
    // --------------------------------------------------

    const topics = await discoverTopics();

    console.log(`📰 Found ${topics.length} topics`);

    const results = [];

    // --------------------------------------------------
    // STEP 2: Process topics
    // --------------------------------------------------

    for (const topic of topics) {
      console.log("");
      console.log("========================================");
      console.log(`🔎 Evaluating: ${topic.title}`);
      console.log("========================================");

      // --------------------------------------------------
      // STEP 3: Search NeuroLens memory
      // --------------------------------------------------

      console.log("🧠 Searching Breeth memory...");

      let memoryResults;

      try {
        memoryResults = await searchMemory(
          `${topic.title} ${topic.description}`,
          5
        );

        console.log("🧠 Memory search completed");
      } catch (memoryError) {
        console.error(
          "⚠️ Memory search failed:",
          memoryError instanceof Error
            ? memoryError.message
            : String(memoryError)
        );

        memoryResults = {
          searchResults: [],
        };
      }

      // --------------------------------------------------
      // STEP 4: Editorial Judge
      // --------------------------------------------------

      console.log("🤖 Running editorial judge...");

      const decision = await judgeTopic(
        topic,
        JSON.stringify(memoryResults)
      );

      console.log(
        `📊 Score: ${decision.score} | Publish: ${decision.publish}`
      );

      console.log(`📝 Reason: ${decision.reason}`);

      // --------------------------------------------------
      // STEP 5: Reject topic
      // --------------------------------------------------

      if (!decision.publish) {
        console.log("❌ Topic rejected");

        results.push({
          topic: topic.title,
          status: "rejected",
          score: decision.score,
          reason: decision.reason,
          memoryChecked: true,
        });

        continue;
      }

      // --------------------------------------------------
      // STEP 6: Generate NeuroLens article
      // --------------------------------------------------

      console.log("✍️ Writing NeuroLens post...");

      const post = await writePost(topic);

      console.log("✅ Post generated");

      // --------------------------------------------------
      // STEP 7: Save published post to Breeth
      // --------------------------------------------------

      console.log("🧠 Saving post to Breeth memory...");

      const memory = await saveMemory(
        `
NeuroLens published a technology news article.

Title:
${post.title}

Summary:
${post.summary}

Analysis:
${post.analysis}

Why it matters:
${post.whyItMatters}

Source:
${post.source}

Source URL:
${post.sourceUrl}

Original topic:
${topic.title}

Original description:
${topic.description}

Published at:
${topic.publishedAt}
`
      );

      console.log("✅ Post saved to Breeth");

      // --------------------------------------------------
      // STEP 8: Return result
      // --------------------------------------------------

      results.push({
        topic: topic.title,
        status: "published",
        score: decision.score,
        reason: decision.reason,
        memoryChecked: true,
        post,
        memory,
      });

      // --------------------------------------------------
      // IMPORTANT:
      // Publish only ONE article per agent run for now.
      // --------------------------------------------------

      break;
    }

    // --------------------------------------------------
    // STEP 9: Return final response
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      agent: "NeuroLens",
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("🤖 NEUROLENS AGENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}