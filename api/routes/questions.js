const questions = require("../../questions/backend");

module.exports = (req, res) => {
  return res.status(200).send({
    message: "ok",
    status: 200,
    body: { questions },
  });
};
