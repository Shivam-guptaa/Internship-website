import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../module/Login.module.css"; // Import CSS module

Axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await Axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      }, { withCredentials: true });

      console.log(response.data);

      if (response.data.token) {
        navigate("/dashboard"); // Redirect to Dashboard after successful login
      } else {
        setError(response.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Log-in</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>} {/* Error message */}
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
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>

      <div className={styles.registerPrompt}>
        <p>Are you not registered? <span className={styles.registerLink} onClick={() => navigate("/register")}>Sign up here</span></p>
      </div>
    </div>
  );
}
