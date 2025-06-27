const express = require("express");
// const { summarizeArticle } = require("../controllers/articleController");
const { summarizeArticle } = require("../controllers/articleController");
const {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticleHistory
} = require("../controllers/articleController");

const requireAuth = require("../middlewares/authMiddleware");

const router = express.Router();


router.use(requireAuth);




router.post("/:id/summary", summarizeArticle);

router.post("/", createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.get("/:id/history", getArticleHistory);




module.exports = router;
