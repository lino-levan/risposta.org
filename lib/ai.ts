import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * If AI is available, return the AI response, otherwise return null.
 */
export async function generateResponse(prompt: string): Promise<string | null> {
  try {
    const ai = new GoogleGenerativeAI(Deno.env.get("GEMINI_KEY"));
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return await result.response.text();
  } catch (err) {
    console.log(err);
    return null;
  }
}
