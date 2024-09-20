//----------------with QuestionIndex -----------------------------
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Confetti from "./Confetti";
import Explain from "./components/Explain/Explain";

export default function App() {
  const { register, handleSubmit } = useForm();

  const [questions, setQuestions] = useState(null);
  const [questionWithIndex, setQuestionWithIndex] = useState(null);
  const [index, setIndex] = useState(0)

  const [rightAnswer, setRightAnswer] = useState(undefined);
  const [allowConfetti, setAllowConfetti] = useState(false);

  const [isExplain, setIsExplain] = useState(false)

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch('http://localhost:2001/questions/10')
      const data = await response.json()

      setQuestions(data.questions)
      setQuestionWithIndex(data.questions[0])
    }
    getQuestions();
  }, [])

  const onSubmit = async ({ answer }) => {

    // if (index === questions.length) return;
    // setIndex((preIndex) => preIndex + 1)

    const answerIndex = questionWithIndex.answers.findIndex(item => item === answer)
    // console.log("the answerIndex", answerIndex);
    // console.log(randomQuestion._id);

    const response = await fetch("http://localhost:2001/checkanswer", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originId: questionWithIndex._id,
        answerIndex,
      }),
    });
    const checkAnswer = await response.json()
    console.log(checkAnswer);

    // setTimeout(() => {
    //   setQuestionWithIndex(questions[index])
    // }, 2000);

    if (checkAnswer) {
      setAllowConfetti(true);
      setRightAnswer(true);
      setTimeout(() => {
        setAllowConfetti(false);
        return setRightAnswer(undefined);
      }, 2000);
    } else {
      setRightAnswer(false);
      setTimeout(() => {
        return setRightAnswer(undefined);
      }, 2000);
    }
  };
  const handleNextQuestion = () => {
    if (index === questions.length) return;
    setIndex((preIndex) => preIndex + 1)
    setQuestionWithIndex(questions[index])
  }
  return (
    <>
      <nav>
        {/* <div>practice</div>
        <div>battle-mode</div> */}
      </nav>
      <div className="m-auto bg-blue-200 w-[40vw] min-h-screen flex items-center">
        {rightAnswer && allowConfetti && <Confetti />}
        <div className="w-full">
          <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
            Test your JS knowledge
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 min-h-[600px]">
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Question:
                </label>
                {questionWithIndex && <h2 className="my-3">{questionWithIndex.question}</h2>}

                <select
                  className="w-full  py-2 px-4 border border-[rgba(75,85,99,0.6)] rounded-md"
                  {...register("answer", { required: true })}
                >
                  <option value="">Select...</option>
                  {questionWithIndex?.answers?.map((answer) => (
                    <option key={answer} value={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Check answer
              </button>

            </form>
            <div className="flex my-5">
              <button onClick={() => setIsExplain(!isExplain)}
                type="submit"
                className=" inline-block bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Explain Answer
              </button>
              <button onClick={handleNextQuestion}
                type="submit"
                className=" inline-block bg-blue-500 text-white font-bold p-4 rounded-lg"
                disabled={isExplain}
              >
                Next Question
              </button>
            </div>
            {rightAnswer === true && (
              <img
                className="pt-3 rounded-md"
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmU3dGhnN3F0azhrbTIyeHo4eHpnZ3RmcGhxZ3g5bWQ2OTc5aXZzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GS1VR900wmhJ6/giphy.gif"
              />
            )}
            {rightAnswer === false && (
              <img
                className="pt-3 rounded-md"
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWNhMzBraGlueTh1a2l2cXV5bmVnemtucjlkMWxtbW1jOGpoZGRvdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/li0dswKqIZNpm/200.gif"
              />
            )}
            {isExplain && <Explain question={questionWithIndex} answers={questionWithIndex.answers} />}
          </div>
        </div>
      </div>
    </>
  );
};






//--------------- with Random Question -------------------------------
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import Confetti from "./Confetti";

// export default function App() {
//   const { register, handleSubmit } = useForm();

//   const [question, setQuestion] = useState(null);
//   const [randomQuestion, setRandomQuestion] = useState(null);

//   const [rightAnswer, setRightAnswer] = useState(undefined);
//   const [allowConfetti, setAllowConfetti] = useState(false);

//   useEffect(() => {
//     const getQuestions = async () => {
//       const response = await fetch('http://localhost:2001/questions/10')
//       const data = await response.json()

//       setQuestion(data.questions)
//     }
//     getQuestions();
//   }, [])

//   useEffect(() => {
//     if (question) { showQuestion(); }
//     return () => { };
//   }, [question]);

//   const showQuestion = () => {
//     const randomNumber = Math.floor(Math.random() * question.length);
//     const randomQuestion = question[randomNumber];

//     if (!randomQuestion) return;

//     setRandomQuestion(randomQuestion)
//   };

//   const onSubmit = async ({ answer }) => {
//     if (!randomQuestion) return;

//     const answerIndex = randomQuestion.answers.findIndex(item => item === answer)
//     // console.log("the answerIndex", answerIndex);
//     // console.log(randomQuestion._id);

//     const response = await fetch("http://localhost:2001/checkanswer", {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         originId: randomQuestion._id,
//         answerIndex,
//       }),
//     });
//     const checkAnswer = await response.json()
//     console.log(checkAnswer);

//     setTimeout(() => {
//       showQuestion();
//     }, 2000);

//     if (checkAnswer) {
//       setAllowConfetti(true);
//       setRightAnswer(true);
//       setTimeout(() => {
//         setAllowConfetti(false);
//         return setRightAnswer(undefined);
//       }, 2000);
//     } else {
//       setRightAnswer(false);
//       setTimeout(() => {
//         return setRightAnswer(undefined);
//       }, 2000);
//     }
//   };

//   return (
//     <>
//       <nav>
//         <div>practice</div>
//         <div>battle-mode</div>

//       </nav>
//       <div className="bg-blue-200 w-[40vw] min-h-screen flex items-center">
//         {rightAnswer && allowConfetti && <Confetti />}
//         <div className="w-full">
//           <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
//             Test your JS knowledge
//           </h2>
//           <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 min-h-[600px]">
//             <form onSubmit={handleSubmit(onSubmit)} action="">
//               <div className="mb-5">
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 font-bold text-gray-600"
//                 >
//                   Question:
//                 </label>
//                 {randomQuestion && <h2 className="my-3">{randomQuestion.question}</h2>}

//                 <select
//                   className="w-full  py-2 px-4 border border-[rgba(75,85,99,0.6)] rounded-md"
//                   {...register("answer", { required: true })}
//                 >
//                   <option value="">Select...</option>
//                   {randomQuestion?.answers?.map((answer) => (
//                     <option key={answer} value={answer}>
//                       {answer}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
//               >
//                 Check answer
//               </button>
//             </form>
//             {rightAnswer === true && (
//               <img
//                 className="pt-3 rounded-md"
//                 src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmU3dGhnN3F0azhrbTIyeHo4eHpnZ3RmcGhxZ3g5bWQ2OTc5aXZzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GS1VR900wmhJ6/giphy.gif"
//               />
//             )}
//             {rightAnswer === false && (
//               <img
//                 className="pt-3 rounded-md"
//                 src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWNhMzBraGlueTh1a2l2cXV5bmVnemtucjlkMWxtbW1jOGpoZGRvdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/li0dswKqIZNpm/200.gif"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };





// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import Confetti from "./Confetti";

// // const questions = [
// //   {
// //     question:
// //       "Was sollte die Hauptverantwortung des Backends in Bezug auf Benutzereingaben sein?",
// //     answers: [
// //       "Daten zu speichern",
// //       "Daten zu validieren und zu sichern",
// //       "Benutzerdaten zu transformieren",
// //     ],
// //     correctIndex: 1,
// //   },
// //   {
// //     question: "Welche Art von Daten müssen immer validiert werden?",
// //     answers: [
// //       "Benutzereingaben wie E-Mails oder Passwörter",
// //       "Nur interne Systemdaten",
// //       "Nur Daten von API-Aufrufen",
// //     ],
// //     correctIndex: 0,
// //   }]

// export default function App() {
//   // let question = []
//   const { register, handleSubmit } = useForm();

//   const [question, setQuestion] = useState(null);
//   const [randomQuestion, setRandomQuestion] = useState(null);

//   const [correctIndex, setCorrectIndex] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [rightAnswer, setRightAnswer] = useState(undefined);
//   const [questionAnswered, setQuestionAnswered] = useState(false);
//   const [allowConfetti, setAllowConfetti] = useState(false);
//   const [mode, setMode] = useState('general');

//   useEffect(() => {
//     const getQuestions = async () => {
//       const response = await fetch('http://localhost:2001/questions/10')
//       const data = await response.json()
//       console.log(data);
//       console.log(data.questions);
//       // question = data.questions
//       // console.log("question-useEffect", question);
//       setQuestion(data.questions)
//       // if (question)
//       // loadQuestion();
//       // loadQuestion();
//       // setTimeout(() => {
//       //   loadQuestion();
//       // }, 2000);

//     }
//     getQuestions();
//   }, [])

//   useEffect(() => {
//     if (question) { loadQuestion(); }

//     return () => { };
//   }, [question]);

//   const loadQuestion = () => {
//     // const random = Math.random();
//     // console.log("question", question);

//     const randomNumber = Math.floor(Math.random() * question.length);
//     const randomQuestion = question[randomNumber];
//     console.log("randomQuestion", randomQuestion);
//     console.log("randomNumber", randomNumber);
//     if (!randomQuestion) return;
//     const { answers, correctIndex } = randomQuestion;
//     console.log(
//       "answers, correctIndex", answers, correctIndex
//     );

//     // setQuestion(question);
//     setRandomQuestion(randomQuestion)

//     setCorrectIndex(correctIndex);

//     // if (!randomQuestion) return;

//     setAnswers(answers);
//   };

//   const onSubmit = ({ answer }) => {
//     // debugger;
//     // if (!question) return;
//     // const correctIndex = question.correctIndex;
//     // const correctAnswer = question.answers[correctIndex];
//     if (!randomQuestion) return;
//     const correctIndex = randomQuestion.correctIndex;
//     const correctAnswer = randomQuestion.answers[correctIndex];

//     setTimeout(() => {
//       loadQuestion();
//     }, 2000);

//     if (correctAnswer === answer) {
//       setAllowConfetti(true);
//       setRightAnswer(true);
//       setTimeout(() => {
//         setAllowConfetti(false);
//         return setRightAnswer(undefined);
//       }, 2000);
//     } else {
//       setRightAnswer(false);
//     }
//   };

//   return (
//     <>
//       <nav>
//         <div>practice</div>
//         <div>battle-mode</div>

//       </nav>
//       <div className="bg-blue-200 w-[40vw] min-h-screen flex items-center">
//         {rightAnswer && allowConfetti && <Confetti />}
//         <div className="w-full">
//           <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
//             Test your JS knowledge
//           </h2>
//           <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 min-h-[600px]">
//             <form onSubmit={handleSubmit(onSubmit)} action="">
//               <div className="mb-5">
//                 <label
//                   htmlFor="name"
//                   className="block mb-2 font-bold text-gray-600"
//                 >
//                   Question:
//                 </label>
//                 {randomQuestion && <h2 className="my-3">{randomQuestion.question}</h2>}

//                 <select
//                   className="w-full  py-2 px-4 border border-[rgba(75,85,99,0.6)] rounded-md"
//                   {...register("answer", { required: true })}
//                 >
//                   <option value="">Select...</option>
//                   {answers?.map((answer) => (
//                     <option key={answer} value={answer}>
//                       {answer}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
//               >
//                 Check answer
//               </button>
//             </form>
//             {rightAnswer === true && (
//               <img
//                 className="pt-3 rounded-md"
//                 src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmU3dGhnN3F0azhrbTIyeHo4eHpnZ3RmcGhxZ3g5bWQ2OTc5aXZzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GS1VR900wmhJ6/giphy.gif"
//               />
//             )}
//             {rightAnswer === false && (
//               <img
//                 className="pt-3 rounded-md"
//                 src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWNhMzBraGlueTh1a2l2cXV5bmVnemtucjlkMWxtbW1jOGpoZGRvdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/li0dswKqIZNpm/200.gif"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

