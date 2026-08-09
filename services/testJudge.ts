import { discoverTopics } from "./newsService";
import { judgeTopic } from "./editorialJudge";

async function test() {
  const topics = await discoverTopics();

  if (topics.length === 0) {
    console.log("No topics discovered.");
    return;
  }

  const topic = topics[0];

  console.log("\n📰 TOPIC");
  console.log(topic.title);

  console.log("\n🤖 ASKING NEUROLENS TO JUDGE...\n");

  const decision = await judgeTopic(topic);

  console.log("DECISION:");
  console.log(JSON.stringify(decision, null, 2));
}

test();