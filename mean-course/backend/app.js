const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require("mongoose");
const Post = require("./models/post");
const postsRoutes = require("./routes/posts");

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://pokalaabhinav:Abhi%40123@cluster0.a0hon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected successfully to db");
  })
  .catch((error) => {
    console.error("Connection failed", error);
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

app.use("/api/posts", postsRoutes);

module.exports = app;
