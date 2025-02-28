import React, { useEffect, useState } from "react";
import Axios from "axios";
import data from "../opportunities.json";
import ComponentCard from "./ComponentCard";
import styles from "../module/Home.module.css"; // Import CSS module

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Home() {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  // Fetch applied internships
  const fetchFromBackend = async () => {
    try {
      const resp = await Axios.get(`${API_BASE_URL}/auth/alreadyapplied`, { withCredentials: true });
      setAppliedOpportunities(resp.data);
    } catch (err) {
      console.error("Error fetching applied opportunities:", err);
    }
  };

  // Fetch initially
  useEffect(() => {
    fetchFromBackend();
  }, []);

  // Function to refresh data after applying
  const handleApply = async () => {
    await fetchFromBackend(); // Re-fetch applied internships
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Internship Opportunities</h1>
      <div className={styles.cardContainer}>
        {Object.values(data.internships_meta).map((item) => (
          <ComponentCard
            key={item.id}
            opportunity={item}
            listapply={appliedOpportunities}
            onApply={handleApply} // Pass down the refresh function
          />
        ))}
      </div>
    </div>
  );
}
