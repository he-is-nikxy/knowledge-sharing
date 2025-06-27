import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => {
        alert("Failed to fetch articles");
        console.error(err);
      });
  }, []);

  return (
    <div className="container">
      <h2>All Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article._id} style={{ marginBottom: "1rem" }}>
              <h3>{article.title}</h3>
              <p><b>Author:</b> {article.createdBy?.name || "Unknown"}</p>
              <Link to={`/articles/${article._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}
