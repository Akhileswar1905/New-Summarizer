import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

const languageCodes: { [key: string]: string } = {
  ar: "Arabic",
  zh: "Chinese",
  nl: "Dutch",
  en: "English",
  fr: "French",
  de: "German",
  el: "Greek",
  he: "Hebrew",
  hi: "Hindi",
  it: "Italian",
  ja: "Japanese",
  ml: "Malayalam",
  mr: "Marathi",
  no: "Norwegian",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  es: "Spanish",
  sv: "Swedish",
  ta: "Tamil",
  te: "Telugu",
  uk: "Ukrainian",
};

export async function generateRes(feed: string, language: string) {
  const langName = languageCodes[language] || "English";

  const model = googleGenerativeAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(
    `${feed}. Give me the summary of this feed like an explanation in 150 words in ${langName}.`
  );
  const response = await result.response;

  return response.text();
}
