const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
});

router.post("/login", (req, res) => {
  console.log("test");
  let fetchedUser;
  User.findOne({ email: req.body.email }).then((user) => {
    fetchedUser = user;
    if (!user) {
      return res.status(401).json({
        message: "Auth failed1",
      });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed2",
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_token",
          { expiresIn: "2h" }
        );
        res.status(200).json({
          message: "Auth successful",
          token: token
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(401).json({
          message: "Auth failed3",
        });
      });
  });
});

module.exports = router;
