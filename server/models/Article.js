const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema({
  content: String,
  title: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  summary: {
    type: String
  },
  revisions: [
    {
      content: String,
      editedAt: { type: Date, default: Date.now },
    }
  ]
});

module.exports = mongoose.model("Article", articleSchema);
