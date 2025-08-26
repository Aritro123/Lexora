import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
// import SystemPrompt from langcha

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",  // your frontend URL
    methods: ["GET", "POST"],
    credentials: true, // if you use cookies/auth
  })
);

app.use(bodyParser.json());

// Connect to Mistral via Ollama
const llm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "mistral",
});

const memory = new BufferMemory();
const chain = new ConversationChain({ llm, memory });


app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "message is required" });
    }
    const result = await chain.call({ input: message });
    res.json({ reply: result.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err?.message || err) });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
