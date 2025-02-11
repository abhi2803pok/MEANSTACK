const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");
const Post = require("./models/post");
mongoose
  .connect(
    "mongodb+srv://pokalaabhinav:Abhi%40123@cluster0.a0hon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connect succesfuly to db");
  })
  .catch(() => {
    console.log("connection failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({ title: req.body.title, content: req.body.content });
  console.log(post);
  post.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Post added successfully",
      id: result._id
    });

  });

});

app.delete("/api/posts/:id", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

module.exports = app;
