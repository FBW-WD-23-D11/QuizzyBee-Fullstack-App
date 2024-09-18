const mongoose = require("mongoose");

// Define the schema for the quiz questions
const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        type: String,
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

export default Question;
