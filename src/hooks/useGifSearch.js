import { useEffect, useState } from "react";
import axios from "axios";

const useGifSearch = (searchValue, pageNumber) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gifs, setGifs] = useState([]);

  const fetchGifs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "t9NTLqeKB4Cow0Vqjg1HuiLiyEFWVh0K",
        },
      });
      setGifs(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const searchData = async () => {
    try {
      if(searchValue.length > 2) {
        const filteredData = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "t9NTLqeKB4Cow0Vqjg1HuiLiyEFWVh0K",
            q: searchValue,
          },
        });
        setGifs((prevGifs) => {
          return [...new Set([...prevGifs, ...filteredData.data.data])];
        });
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setGifs([]);
  }, [searchValue]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    searchData();
  }, [pageNumber, searchValue]);

  useEffect(() => {
    fetchGifs();
  }, []);

  return {
    isLoading,
    error,
    gifs,
  };
};

export default useGifSearch;
