const Article = require("../models/Article");
// const generateSummary = require("../utils/ai");



const { getSummary } = require("../utils/ai");


exports.createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;

        const article = await Article.create({
            title,
            content,
            createdBy: req.user._id
        });

        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getArticles = async (req, res) => {

    try {
        const articles = await Article.find().populate("createdBy", "name");
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getArticleById = async (req, res) => {
    const articleId = req.params.id;

    
    try {
        const article = await Article.findById(articleId).populate("createdBy", "name");
        // const article = await Article.findById(id).lean();

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.updateArticle = async (req, res) => {

   

    try {
        const { title, content } = req.body;
        const article = await Article.findById(req.params.id);

        if (!article) return res.status(404).json({ message: "Article not found" });

        if (article.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        article.revisions.push({
            title: article.title,
            content: article.content
        });


        article.title = title;
        article.content = content;

        await article.save();
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteArticle = async (req, res) => {


    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Article not found" });

        if (article.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await article.remove();
        res.json({ message: "Article deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getArticleHistory = async (req, res) => {


    try {
        const article = await Article.findById(req.params.id);

        if (!article) return res.status(404).json({ message: "Article not found" });


        if (article.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.json(article.revisions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




exports.summarizeArticle = async (req, res) => {
    try {
      const { id } = req.params;
  
      const article = await Article.findById(id);
      if (!article) return res.status(404).json({ message: "Article not found" });
  

      if (article.summary) {
        return res.json({ summary: article.summary });
      }
  

      const summary = await getSummary(article.content);
  

      article.summary = summary;
      await article.save();
  
      res.json({ summary });
    } catch (err) {
      console.error("Summary error:", err);
      res.status(500).json({ message: "Failed to summarize article" });
    }
  };



