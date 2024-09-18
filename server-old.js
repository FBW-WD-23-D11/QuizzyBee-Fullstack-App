import express from "express";
import mongoose from "mongoose";
import Question from "./models/question.js"; // Assuming this is the path to your model

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/quizDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a new question (POST)
app.post("/questions", async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all questions (GET)
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific question (DELETE)
app.delete("/questions/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(deletedQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Seed the database with mock data
app.post("/questions/seed", async (req, res) => {
  const mockData = [
    {
      creator: "Alice",
      question: "What is 2 + 2?",
      answers: ["3", "4", "5"],
      correctIndex: 1,
    },
    {
      creator: "Bob",
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin"],
      correctIndex: 0,
    },
  ];

  try {
    const insertedQuestions = await Question.insertMany(mockData);
    res.status(201).json(insertedQuestions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete all questions (DELETE)
app.delete("/questions", async (req, res) => {
  try {
    const result = await Question.deleteMany({});
    res
      .status(200)
      .json({ message: `${result.deletedCount} questions deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
