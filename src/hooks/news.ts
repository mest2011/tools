import { useEffect, useState } from "react";
import { xmlToJson } from "../utils/xml_to_json";
import axios from "axios";

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_APP_FEED_RSS}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/xml",
          "Referrer-Policy": "no-referrer",
          "Accept": "application/xml",
        },
      })
      .then((response) => {
        console.log(response.data);
        const data = xmlToJson(response.data);
        setNews(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading };
};

export default useNews;
