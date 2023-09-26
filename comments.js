// Create web server

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("./config");
const Comment = require("./models/Comment");
const User = require("./models/User");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect(config.db, { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Get all comments from database
app.get("/", (req, res) => {
  Comment.find((err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// Get all comments from database
app.get("/comments", (req, res) => {
  Comment.find((err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// Get comment by id
app.get("/comments/:id", (req, res) => {
  let id = req.params.id;
  Comment.findById(id, (err, comment) => {
    res.json(comment);
  });
});

// Get comments by user id
app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  Comment.find({ user_id: id }, (err, comments) => {
    res.json(comments);
  });
});

// Get comments by post id
app.get("/post/:id", (req, res) => {
  let id = req.params.id;
  Comment.find({ post_id: id }, (err, comments) => {
    res.json(comments);
  });
});

// Add new comment to database
app.post("/add", (req, res) => {
  let comment = new Comment(req.body);
  comment
    .save()
    .then(comment => {
      res.status(200).json({ comment: "comment added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new comment failed");
    });
});

// Update comment by id
app.post("/update/:id", (req, res) => { 
  Comment.findById(req.params.id, (err, comment) => {
    if (!comment) res.status(404).send("data is not found");
    else {
      comment.comment = req.body.comment;
      comment
        .save()
        .then(comment => {
          res.json("Comment updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});