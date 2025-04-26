import { Request, Response } from "express";
import { getNews } from "../utils/news_feed";
import { generateRes } from "../utils/gemini_config";
import { getUser } from "../databases/user";
import { db } from "../utils/dbconfig";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNewsToday = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    const { language, user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await getUser(connection, user_id as string);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const categories = user.topCategories?.map(
      (category: any) => category.category
    );

    if (!categories || categories.length === 0) {
      return res
        .status(400)
        .json({ message: "No categories found for the user" });
    }

    let summarized_news: any[] = [];
    let news: any[] = [];

    for (let category of categories) {
      const n = await getNews(category);
      news.push(...n);
    }

    for (let i = 0; i < news.length; i++) {
      const news_item = news[i];

      // Delay to prevent hitting Gemini API rate limits
      if (i !== 0) await delay(5000); // 5-second delay between summaries

      try {
        const summary = await generateRes(
          news_item.content,
          language ? (language as string) : "en"
        );
        summarized_news.push({
          title: news_item.title,
          content: news_item.content,
          summary: summary,
          url: news_item.url,
          image: news_item.image,
          publishedAt: news_item.publishedAt,
        });
      } catch (error) {
        console.error(`Failed to summarize news at index ${i}:`, error);
        continue; // Skip this item on error
      }
    }

    return res.status(200).json({
      summarized_news: summarized_news,
    });
  } catch (error) {
    console.log("Error while fetching news:", error);
    return res.status(500).json({
      message: "Error while fetching news",
    });
  } finally {
    connection.release();
  }
};
