import axios from "axios";

export const getNews = async (
  // categories: string,
  topic: string,
  language: string
) => {
  console.log(language);
  try {
    // if (categories.length === 0) {
    //   categories = "general";
    // }

    // https://gnews.io/api/v4/top-headlines?q=${topic}&country=in&max=5&apikey=af2a40a9eb35e1eeec50173cbcb7e525
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${topic}&country=in&max=5&apikey=af2a40a9eb35e1eeec50173cbcb7e525`
    );
    console.log(response.data.articles);
    return response.data.articles;
  } catch (error) {
    console.log("Error while fetching news!");
  }
};
