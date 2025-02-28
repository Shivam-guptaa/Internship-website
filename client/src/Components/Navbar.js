import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import styles from "../module/Navbar.module.css"; // Fixed import path

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Directly use location.pathname

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await Axios.get(`${API_BASE_URL}/auth/verify`, { withCredentials: true });
        setIsLoggedIn(res.data.status);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await Axios.get(`${API_BASE_URL}/auth/logout`, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {location.pathname === "/" ? (
          <li><Link to="/dashboard">Dashboard</Link></li>
        ) : (
          <li><Link to="/">Home</Link></li>
        )}
      </ul>
      <h2 className={styles.heading}><b>MyPortal</b></h2>
      <div>
        {isLoggedIn ? (
          <button className={styles.authButton} onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button className={styles.authButton}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
