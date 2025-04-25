import { Request, Response } from "express";
import { getNews } from "../utils/news_feed";
import { generateRes } from "../utils/gemini_config";

export const getNewsToday = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const news = await getNews();
    let summarized_news = [];
    for (let i = 0; i < news.length; i++) {
      const feed = news[i].content;
      const summary = await generateRes(feed);
      summarized_news.push({
        title: news[i].title,
        url: news[i].url,
        image: news[i].image,
        summary: summary,
      });
    }

    return res.status(200).json({
      summarized_news: summarized_news,
    });
  } catch (error) {
    console.log("Error while fetching news");
  }
};
