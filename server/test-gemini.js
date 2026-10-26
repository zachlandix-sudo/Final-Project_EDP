import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  console.log("Testing model:", process.env.GEMINI_MODEL);

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: 'Reply with exactly: {"status":"ok"}',
    config: {
      responseMimeType: "application/json",
      maxOutputTokens: 100,
    },
  });

  console.log("Gemini test succeeded:", response.text);
} catch (error) {
  console.error("Gemini test failed:", {
    message: error?.message,
    status: error?.status ?? error?.statusCode,
    code: error?.code,
  });
}
