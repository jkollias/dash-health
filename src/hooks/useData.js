import { useState, useEffect } from "react";

const useData = () => {
  const [siteNavLinks, setSiteNavLinks] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/data.json");
        const patientsRes = await fetch("/data/patients.json");
        if (!res.ok) throw new Error("Request failed");
        if (!patientsRes.ok) throw new Error("Request failed");
        const data = await res.json();
        const patients = await patientsRes.json();
        setCharacters(data.site_profiles);
        setSiteNavLinks(data.site_nav);
        setPatients(patients);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { siteNavLinks, characters, patients, loading, error };
};

export default useData;