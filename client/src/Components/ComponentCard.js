import React from "react";
import Axios from "axios";
import styles from "../module/ComponentCard.module.css";

Axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ComponentCard({ opportunity, listapply, onApply }) {
  const { id, profile_name, locations, company_name, stipend, start_date, duration } = opportunity;

  const apply = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${API_BASE_URL}/auth/apply`,
        {
          pname: profile_name,
          cname: company_name,
          stipend: stipend.salary,
          duration,
          id,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      onApply(); // Trigger refresh in Home
    } catch (err) {
      console.error("Error applying:", err);
    }
  };

  const isApplied = Array.isArray(listapply) && listapply.some(item => item.id === id);

  return (
    <div className={styles.card}>
      <h2><strong>{profile_name}</strong></h2>
      <p>Company Name: {company_name}</p>
      <p>Stipend: {stipend.salary}</p>
      <p>Location: {locations.map((item) => item.string).join(", ") || "Remote Job"}</p>
      <p>Duration: {duration}</p>
      <p>Start Date: {start_date}</p>
      <button className={styles.button} onClick={apply} disabled={isApplied}>
        {isApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}
