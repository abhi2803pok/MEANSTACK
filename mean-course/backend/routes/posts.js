const express = require("express");
const routes = express.Router();
const Post = require("../models/post");
const mongoose = require("mongoose");

routes.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.findById(req.params.id).then((post) => {
    console.log(post);
    if (post) {
      res.status(200).json(post);
    } else {

      res.status(404).json({ message: "Post not found!" });
    }
  });
}, (err) => {
  console.log(err);
});

routes.post("", (req, res, next) => {
  const post = new Post({ title: req.body.title, content: req.body.content });
  console.log(post);
  post.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Post added successfully",
      id: result._id,
    });
  });
});

routes.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

routes.delete("/:id", (req, res, next) => {
  const postId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  console.log(postId);
  Post.deleteOne({ _id: postId }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

routes.get("", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

// Global error handler middleware
routes.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

module.exports = routes;
