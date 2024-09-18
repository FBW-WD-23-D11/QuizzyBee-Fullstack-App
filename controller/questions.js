const NUMBER_OF_QUESTIONS = 10;

const scores = {
  "0/3": "You can do better than this",
  "4/6": "Not so good :( keep practicing",
  "7/8": "Not bad",
  "9/10": "Very good",
};

const getScore = (correctAnswers) => {
  const entry = Object.entries(scores).find(([scoreArea, message]) => {
    const [lowerBound, _, ...upperBound] = scoreArea.split("");

    return (
      correctAnswers >= Number(lowerBound) &&
      correctAnswers <= Number(upperBound.join(""))
    );
  });

  const [_, message] = entry;

  return `You had a score of ${String(correctAnswers)} correct answers out of 10
${message}`;
};

const getScoreMarius = (correctAnswers) => {
  const entry = Object.entries(scores).find(([scoreArea, message]) => {
    const [lowerBound, upperBound] = scoreArea.split("/");

    return (
      correctAnswers >= Number(lowerBound) &&
      Number(correctAnswers) <= upperBound
    );
  });

  const [_, message] = entry;

  return `You had a score of ${String(correctAnswers)} correct answers out of 10
${message}`;
};
