import axios from "axios";

export const getNews = async (categories: string) => {
  try {
    if (categories.length === 0) {
      categories = "general";
    }
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${categories}&lang=en&country=in&max=10&apikey=af2a40a9eb35e1eeec50173cbcb7e525`
    );
    return response.data.articles;
  } catch (error) {
    console.log("Error while fetching news!");
  }
};
