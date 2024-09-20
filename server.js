const mongoose = require("mongoose");

const express = require("express");
const questions = require("./api/routes/questions.js");
const app = express();
const cors = require("cors");
const Question = require("./model/questions.js");

const port = 2001;
app.use(express.json());
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
        origin: "http://localhost:5174", // Allow requests from this domain
        methods: "GET", // Allow only GET and POST requests
    })
);

app.get("/questions/:limit", async (req, res) => {
    // console.log(2222);
    try {
        const { limit } = req.params;
        // console.log("logged: limit", limit);
        if (limit != 10) {
            return res.send({
                status: 400,
                message: "a number different than 10 is not yet supported",
            });
        }

        // const questions = await Question.find({}).limit(limit);
        const questions = await Question.find({}, { correctIndex: 0 }).limit(
            limit
        );
        // console.log(questions);

        res.send({ status: 200, questions });
        // res.send(questions);
    } catch (e) {
        console.log("logged: error", e);
    }
});

app.post("/checkanswer", async (req, res) => {
    console.log(req.body);
    const { originId, answerIndex } = req.body;

    const question = await Question.findOne({ _id: originId });
    // console.log(question);
    res.status(200).send(question.correctIndex === answerIndex);
    // return question.correctIndex === answerIndex
    //     ? res.send(true)
    //     : res.send(false);
});

app.listen(port, () => {
    console.log("Listening on " + port);
});

module.exports = app;
