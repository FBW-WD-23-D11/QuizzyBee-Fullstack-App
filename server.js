const mongoose = require("mongoose");

const express = require("express");
const questions = require("./api/routes/questions.js");
const app = express();
const cors = require("cors");
const Question = require("./model/questions.js");
const User = require('./model/users.js');
const dotenv = require('dotenv');

dotenv.config();
const env = process.env;

const port = 2000;

// Connect to MongoDB
mongoose
  // .connect("mongodb://localhost:27017/quizDB", {})
  .connect(env.MONGO_URI)
  .then(async () => {
    console.log("connected to Mongoose! Yippee!!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(
  cors({
    // origin: "http://localhost:5173", // Allow requests from this domain
    // methods: "GET", // Allow only GET and POST requests
  })
);

app.use(express.json());

app.get("/questions/:limit", async (req, res) => {
  // console.log(2222);
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
    // console.log("logged: limit", limit);
  } catch (e) {
    console.log("logged: error", e);
  }
  // const questions = Question.find().limit();
});

app.post("/check-answer", async (req, res) => {
  const { body } = req.body;
});

app.post("/questions", async (req, res) => {
  console.log(req.body);

  const newQuestion = new Question(req.body);

  const savedQuestion = await newQuestion.save();

  res.status(200).json({ message: savedQuestion });

  res.end();
});

app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.post('/users', async (req, res) => {
  console.log(req.body);

  const newUser = new User(req.body);

  const savedUser = await newUser.save();

  res.json(savedUser);

  res.end();
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;
