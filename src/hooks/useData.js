import { useState, useEffect } from "react";

const useData = () => {
  const [siteNavLinks, setSiteNavLinks] = useState([]); 
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res, patientsRes] = await Promise.all([
          fetch("https://raw.githubusercontent.com/jkollias/dash-health/refs/heads/main/public/data/data.json"),
          fetch("https://raw.githubusercontent.com/jkollias/dash-health/refs/heads/main/public/data/patients.json") // Point this to the raw patients file
        ]); 
        if (!res.ok || !patientsRes.ok) throw new Error("Request failed");
       
        const [data, patients] = await Promise.all([
          res.json(),
          patientsRes.json()
        ]); 

        setSiteNavLinks(data.site_nav || []);
        setPatients(patients || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { siteNavLinks, patients, loading, error };
};

export default useData;