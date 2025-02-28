import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import styles from "./App.module.css"; // Import CSS module

function Layout() {
  const location = useLocation();

  // Show Navbar only on Home and Dashboard pages
  const showNavbar = location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <div className={styles.container}>
      {showNavbar && <Navbar />}
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
