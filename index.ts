import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { GooglePaLM, GooglePaLMTextInput } from "langchain/llms/googlepalm";
import { GoogleVertexAI, GoogleVertexAITextInput } from "langchain/llms/googlevertexai";

dotenv.config();
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT;

const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const palm = new GooglePaLM({
  apiKey: process.env.GOOGLE_PALM_API_KEY, // optional
});

// setup: https://cloud.google.com/vertex-ai/docs/start/client-libraries#node.js
const vertexAI = new GoogleVertexAI();

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.post("/predict", async (req, res) => {
  const { text } = req.body;
  console.log(text);
  const response = await chat.predict(text);
  console.log(response);

  res.json({ response });
});

app.post("/generateText", async (req, res) => {
  const { text } = req.body;
  console.log(text);

  const response = await palm.predict(text, <GooglePaLMTextInput>{
    temperature: 0.5,
    modelName: "models/text-bison-001", 
    maxOutputTokens: 1024, 
    topK: 40, 
    topP: 0.7, 
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  });
  res.json({ response });
});

app.post("/predictText", async (req, res) => {
  const { text } = req.body;
  console.log(text);

  const response = await vertexAI.predict(text, <GoogleVertexAITextInput>{
    temperature: 0.5,
    modelName: "models/text-bison-001", 
    maxOutputTokens: 1024, 
    topK: 40, 
    topP: 0.7, 
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  });
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
