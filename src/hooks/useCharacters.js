import { useState, useEffect } from "react";

const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("./data/data.json");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setCharacters(data.site_profiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { characters, loading, error };
};

export default useCharacters;