import { useState, useEffect } from "react";

const useSiteNavLinks = () => {
  const [siteNavLinks, setSiteNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("./data/data.json");
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setSiteNavLinks(data.site_nav);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { siteNavLinks, loading, error };
};

export default useSiteNavLinks;