const mongoose = require("mongoose");

// Define the schema for the quiz questions
const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: false,
    },
    question: {
      type: String,
      unique: true,
      required: true,
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    correctIndex: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
