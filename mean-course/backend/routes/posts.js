const express = require("express");
const routes = express.Router();
const Post = require("../models/post");
const mongoose = require("mongoose");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const multer = require("multer");

routes.get(
  "/:id",
  (req, res, next) => {
    console.log(req.params.id);

    Post.findById(req.params.id).then((post) => {
      console.log(post);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
  },
  (err) => {
    console.log(err);
  }
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

routes.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });

    console.log(post);
    post.save().then((result) => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          id: result._id,
          title: result.title,
          content: result.content,
          imagePath: result.imagePath,
        },
      });
    });
  }
);

routes.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });
});

routes.delete("/:id", (req, res, next) => {
  const postId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  Post.deleteOne({ _id: postId }).then((result) => {
    res.status(200).json({ message: "Post deleted!" });
  });
});

routes.get("", (req, res) => {
  console.log(req.query);
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    console.log("test");
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedDocuments = documents;
      return Post.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedDocuments,
        maxPosts: count,
      });
    });
});

// Global error handler middleware
routes.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

module.exports = routes;
