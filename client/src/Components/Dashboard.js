import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../module/Dashboard.module.css"; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Dashboard() {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await Axios.get(`${API_BASE_URL}/auth/verify`, { withCredentials: true });
        if (!res.data.status) {
          throw new Error(res.data.message); 
        }
        fetchAppliedOpportunities();
      } catch (err) {
        console.error("Authentication failed:", err.message);
        navigate("/login"); 
      }
    };
  
    verifyUser();
  }, [navigate]);

  const fetchAppliedOpportunities = async () => {
    try {
      const list = await Axios.get(`${API_BASE_URL}/auth/alreadyapplied`, { withCredentials: true });
      setAppliedOpportunities(list.data);
    } catch (err) {
      console.error("Error fetching applied opportunities:", err);
    }
  };

  const inter = async () => {
    try {
      navigate("/");
    } catch (err) {
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Dashboard</h1>
      {appliedOpportunities.length === 0 ? (
        <p className={styles.noApplications}>No applications found</p>
      ) : (
        appliedOpportunities.map((item) => (
          <div key={item._id} className={styles.card}>
            <p><strong>Company Name:</strong> {item.company_name}</p>
            <p><strong>Profile Name:</strong> {item.profile_name}</p>
            <p><strong>Stipend:</strong> {item.stipend}</p>
            <p><strong>Duration:</strong> {item.duration}</p>
          </div>
        ))
      )}
      <button onClick={inter} className={styles.logoutButton}>Apply For Job</button>
    </div>
  );
}
