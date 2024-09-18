const mongoose = require("mongoose");

const express = require("express");
const questions = require("./api/routes/questions.js");
const app = express();
const cors = require("cors");
const { default: Question } = require("./model/questions.js");

const port = 2000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/quizDB", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this domain
    methods: "GET", // Allow only GET and POST requests
  })
);

app.get("/questions/:limit", (req, res) => {
  const { limit } = req.params;

  console.log("logged: limit", limit);
  // const questions = Question.find().limit();
});

app.post("/check-answer", (req, res) => {
  const { body } = req;
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;
