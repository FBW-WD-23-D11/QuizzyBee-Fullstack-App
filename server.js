const mongoose = require("mongoose");

const express = require("express");
const questions = require("./api/routes/questions.js");
const app = express();
const cors = require("cors");
const Question = require("./model/questions.js");

app.use(express.json());

const port = 2000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/QuizzyBee", {})
  .then(async () => {
    console.log("connected to Mongoose! Yippee!!");
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

app.get("/questions/:limit", async (req, res) => {
  console.log(2222);
  try {
    const { limit } = req.params;

    if (limit != 10) {
      return res.send({
        status: 400,
        message: "a number different than 10 is not yet supported",
      });
    }

    const questions = await Question.find({}).limit(limit);

    res.send({ status: 200, questions });
    console.log("logged: limit", limit);
  } catch (e) {
    console.log("logged: error", e);
  }
  // const questions = Question.find().limit();
});

app.post("/check-answer", (req, res) => {
  const { body } = req;
});

app.post("/addquestion", async (req, res) => {
  try {
    const { userId, question, answers, correctIndex } = req.body;

    const newQuestion = new Question({
      userId,
      question,
      answers,
      correctIndex,
    });

    await newQuestion.save();
    res.status(201).json({
      message: "Frage erfolgreich hinzugefügt!",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: Serverfehler });
  }
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;
