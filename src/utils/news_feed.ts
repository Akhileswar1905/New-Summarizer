import axios from "axios";

export const getNews = async () => {
  try {
    const response = await axios.get(
      "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=af2a40a9eb35e1eeec50173cbcb7e525"
    );
    return response.data.articles;
  } catch (error) {
    console.log("Error while fetching news!");
  }
};
