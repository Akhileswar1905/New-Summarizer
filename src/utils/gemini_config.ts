import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function generateRes(feed: string) {
  const model = googleGenerativeAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(
    `${feed}. Give me the summary of this feed like an explanation in 300 words.`
  );
  const response = await result.response;

  // console.log(response.text());
  return response.text();
}
