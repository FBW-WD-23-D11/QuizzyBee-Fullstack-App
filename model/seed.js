const { default: mongoose } = require("mongoose");
const questions = require("../questions/backend");
const Question = require("./questions");

const seed = async () => {
  // Connect to MongoDB
  mongoose
    .connect("mongodb://localhost:27017/quizDB", {})
    .then(async () => {
      const result = await Question.insertMany(questions);
      console.log("logged: result", result);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
seed();
