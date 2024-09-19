const mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");
const Question = require("./model/questions.js");

const port = 2000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/quizDB", {})
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

app.use(express.json());

app.get("/questions/:limit", async (req, res) => {
  try {
    const { limit } = req.params;

    if (limit != 10) {
      return res.send({
        status: 400,
        message: "a number different than 10 is not yet supported",
      });
    }

    const questions = await Question.find({}, { correctIndex: 0 }).limit(
      Number(limit)
    );

    res.send({ status: 200, questions });
    console.log("logged: limit", limit);
  } catch (e) {
    console.log("logged: error", e);
  }
  // const questions = Question.find().limit();
});

// const frage = { id: "dgs6sdg6gs6" };
app.post("/checkanswer", async ({ body: { _id, answerIndex } }, res) => {
  console.log(_id, answerIndex);
  const question = await Question.findById(_id);

  res.send({ status: 200, isCorrect: answerIndex === question.correctIndex });
});

app.post("/getscore", (req, res) => {
  const { body } = req;
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;
