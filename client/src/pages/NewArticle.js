import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/NewArticle.css";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/articles", { title, content });
      alert("Article created!");
      navigate("/articles");
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      alert("Failed to create article.");
    }
  };

  return (
    <div className="new-article-container">
      <h2>Create New Article</h2>
      <form onSubmit={handleSubmit} className="article-form">
        <input
          type="text"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          rows="10"
          placeholder="Write your article content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publish Article</button>
      </form>
    </div>
  );
};

export default NewArticle;
