import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/detail.css";
import axios from "axios"

import { AuthContext } from "../context/AuthContext";




const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const [userId, setUserId] = useState(null);



  useEffect(() => {
    if (!id) return;

    api.get(`/articles/${id}`)
      .then((res) => {
        console.log("Article response:", res.data);
        setArticle(res.data);
      })
      .catch((err) => {
        console.error("Error loading article:", err);
      });

    api.get("/auth/user")
      .then((res) => {
        console.log("Logged in user ID:", res.data.id);
        setUserId(res.data.id);
      })
      .catch((err) => {
        console.error("Error loading user:", err);
      });
  }, [id]);



  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/articles/${id}/summary`);
      setSummary(res.data.summary);
    } catch (err) {
      alert("Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  if (!article) return <p>Loading article...</p>;




  return (
    <div className="article-detail">
      <h2>{article.title}</h2>

      {userId && (
        article.createdBy === userId ||
        article.createdBy?._id?.toString?.() === userId?.toString?.()
      ) && (
          <Link to={`/articles/edit/${article._id}`}>
            <button>Edit</button>
          </Link>
        )}

      <p>{article.content}</p>

      <button onClick={handleSummarize}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="summary-box">
          <h3>AI Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "View History"}
      </button>


      {showHistory && (
        <div className="history-section">
          <h3>Edit History:</h3>
          {(article.revisions || []).map((ver, idx) => (
            <div key={idx} className="history-entry">
              <small>{article.revisions.map((e) => {
                return (
                  <>
                    {e.editedAt}
                  </>
                )
              })}</small>
              <p>{ver.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
