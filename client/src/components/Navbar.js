
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/components.css";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      setIsLoggedIn(false);
      alert("Logged out");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <span><Link to="/articles">KnowledgeShare</Link></span>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/articles">Articles</Link>
            <Link to="/articles/new">New</Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "1rem",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
