const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  console.log(req.body, "req.body");
  res.status(201).json({
    message: "Post added sucessfully",
  });
  console.log(res, "res");
});
app.use("/api/posts", (req, res, next) => {
  posts = [
    {
      id: "ud1",
      title: "this is first title",
      content: "this is first content",
    },
    {
      id: "ud2",
      title: "this is second title",
      content: "this is second content",
    },
    {
      id: "ud3",
      title: "this is third title",
      content: "this is third content",
    },
  ];
  res.status(200).json({
    message: "Posts Fetched Sucessfully",
    posts: posts,
  });
});

module.exports = app;
