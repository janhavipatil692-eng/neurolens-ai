# 🧠 NeuroLens AI

### Autonomous AI Technology Intelligence & Editorial Agent

NeuroLens is an autonomous AI agent that discovers current technology and AI news, evaluates its importance, checks its memory for previously processed topics, generates editorial content, and stores new knowledge in long-term memory using Breeth AI.

---

## 🚀 What is NeuroLens?

NeuroLens acts as an autonomous AI technology editor.

Instead of simply displaying news, NeuroLens follows an intelligent pipeline:

**Discover → Remember → Evaluate → Decide → Write → Remember**

The agent continuously processes technology topics and decides which stories are worth publishing for AI engineers, developers, researchers, and technology professionals.

---

## ✨ Key Features

- 📰 **AI & Technology News Discovery**
  - Collects recent technology topics from RSS feeds.

- 🧠 **Long-Term AI Memory**
  - Uses Breeth AI to store and retrieve knowledge.
  - Helps NeuroLens remember previously processed topics.

- ⚖️ **AI Editorial Judge**
  - Evaluates the importance and relevance of each topic.
  - Assigns a score from 1–10.
  - Decides whether a topic should be published.

- ✍️ **Autonomous Content Generation**
  - Generates a title, summary, technical analysis, and "Why It Matters" section.

- 🔄 **Memory-Aware Processing**
  - Searches existing memory before evaluating new topics.
  - Saves published content back into Breeth.

- 📊 **Dashboard**
  - Provides a visual interface for monitoring the NeuroLens agent.

- 🤖 **Autonomous Agent Workflow**
  - The complete process runs automatically without requiring manual editorial decisions.

---

## 🏗️ Architecture

```text
             ┌──────────────────┐
             │   RSS News Feeds │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │ Topic Discovery  │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │  Breeth Memory   │
             │     Search       │
             └────────┬─────────┘
                      ↓
             ┌──────────────────┐
             │ Editorial Judge  │
             │   AI Evaluation  │
             └────────┬─────────┘
                      ↓
                Publish?
                 /      \
               No        Yes
               ↓          ↓
             Reject   Generate Post
                           ↓
                    ┌──────────────┐
                    │ Save to      │
                    │ Breeth       │
                    └──────────────┘