import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../module/Register.module.css"; // Import CSS module

Axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message

    try {
      const response = await Axios.post(`${API_BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      console.log(response.data);

      if (response.data.token) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setError(response.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>} {/* Error message */}
        {success && <p className={styles.success}>{success}</p>} {/* Success message */}
        
        <div className={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Ex. Shivam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Ex. shivam@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Ex. strong_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>

      <div className={styles.loginPrompt}>
        <p>Already registered? <span className={styles.loginLink} onClick={() => navigate("/login")}>Log in here</span></p>
      </div>
    </div>
  );
}
