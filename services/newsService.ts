import Parser from "rss-parser";

const parser = new Parser();

const RSS_FEEDS = [
  "https://techcrunch.com/category/artificial-intelligence/feed/",
  "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  "https://www.technologyreview.com/feed/",
];

export interface NewsTopic {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
}

export async function discoverTopics(): Promise<NewsTopic[]> {
  const allTopics: NewsTopic[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);

      const topics = feed.items.slice(0, 5).map((item) => ({
        title: item.title || "Untitled topic",
        description:
          item.contentSnippet ||
          item.content ||
          item.summary ||
          "",
        url: item.link || "",
        publishedAt:
          item.isoDate ||
          item.pubDate ||
          new Date().toISOString(),
        source: feed.title || feedUrl,
      }));

      allTopics.push(...topics);
    } catch (error) {
      console.error(`Failed to read RSS feed: ${feedUrl}`, error);
    }
  }

  return allTopics;
}