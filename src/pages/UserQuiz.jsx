import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { QuizChoicesButtons } from "../components/QuizChoicesButtons";
import { shuffleArray } from "../utils/shuffle-arr";
import { Link } from "react-router-dom";

export function UserQuiz() {
  const location = useLocation();
  const userQuiz = location.state || {};
  const {
    categoryColor,
    categoryName,
    quizTitle,
    quizId,
    quizQuestions = [],
    quizDescription,
    quizCreatedAt,
  } = userQuiz;

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  if (!quizQuestions || quizQuestions.length === 0) {
    return <div>No quiz data available</div>;
  }

  const correctTerm = quizQuestions[currentQuestion]?.term;
  const allTerms = quizQuestions.map((q) => q.term);
  const otherTerms = allTerms.filter((term) => term !== correctTerm);
  const shuffledOtherTerms = shuffleArray([...otherTerms]);
  const numberOfIncorrectChoices = 3;
  const incorrectChoices = shuffledOtherTerms.slice(
    0,
    numberOfIncorrectChoices
  );

  let finalChoices = [correctTerm, ...incorrectChoices];

  function handleChoiceClick(choice) {
    if (choice === correctTerm) {
      setFeedback("✅ Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`❌ Incorrect! The correct answer is: ${correctTerm}`);
    }

    setTimeout(() => {
      setFeedback("");
    }, 2000);
    setCurrentQuestion((prev) => prev + 1);
  }

  useEffect(() => {
    if (currentQuestion >= quizQuestions.length) {
      setIsQuizCompleted(true);
    } else {
    }
  }, [currentQuestion, quizQuestions.length]);

  function getBestScore() {
    return parseInt(localStorage.getItem(`userQuiz_${quizTitle}`) || "0");
  }

  function saveBestScore(score) {
    const currentBest = getBestScore();
    if (score > currentBest) {
      localStorage.setItem(`userQuiz_${quizTitle}`, score.toString());
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (isQuizCompleted && quizQuestions.length > 0) {
      const currentScore = score;
      saveBestScore(currentScore);
    }
  }, [isQuizCompleted]);

  finalChoices = shuffleArray(finalChoices);

  return (
    <>
      {!isQuizCompleted ? (
        <>
          <div
            className="mt-5 sm:mt-10 text-[var(--bg-color)] sm:text-2xl p-5 sm:p-10 sm:h-130 sm:overflow-hidden select-none "
            style={{ backgroundColor: categoryColor }}
          >
            <div className="flex justify-between flex-wrap ">
              <div className="flex flex-col items-start">
                <p>
                  Question: {currentQuestion + 1}/{quizQuestions.length}
                </p>
                <p>Category: {categoryName}</p>
                <p>Quiz name: {quizTitle}</p>
              </div>

              <div>
                <p>Score: {score}</p>
                <p>Best Score: {getBestScore()}</p>
              </div>
            </div>
            <div className="animation-soft-pop-in ">
              <p className="text-xl sm:text-3xl text-[var(--bg-color)] text-center mt-4 transition-all duration-500 ease-in-out animate-fade-in">
                {quizQuestions[currentQuestion]?.definition}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-5 sm:mt-10 sm:grid sm:grid-cols-2 gap-4 sm:gap-5 sm:max-w-130 mx-auto">
              {finalChoices.map((choiceTerm, index) => (
                <QuizChoicesButtons
                  key={`${choiceTerm}-${index}`}
                  choices={choiceTerm}
                  handleChoiceClick={() => handleChoiceClick(choiceTerm)}
                />
              ))}
            </div>
            <p className="sm:text-xl text-[var(--bg-color)] text-center mt-4 transition-all duration-500 ease-in-out animate-fade-in">
              {feedback}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="text-[var(--bg-color)] flex flex-col justify-center items-center mt-10 bg-[#004D40] py-10 h-90 select-none animate-slide-in-left">
            <p className="text-xl sm:text-2xl mb-3">
              {score > getBestScore()
                ? `New best score!`
                : `Current best score: ${getBestScore()}`}
            </p>
            <p className="text-2xl sm:text-4xl mb-3">Your brain bulb is up💡</p>

            <div className="text-center rounded-2xl">
              <p className="text-xl sm:text-3xl">
                You got: {score} / {quizQuestions.length}
              </p>
              <p className="sm:text-xl">
                {(score / quizQuestions.length) * 100 >= 80
                  ? "You're clearly glowing! Nice job"
                  : "Still got that spark! Wanna light it up again?"}
              </p>
            </div>
            <Link to="/CreateQuiz">
              <button className="sm:text-xl border-2 bg-[#B34C00] px-4 py-1 rounded-2xl mt-3 cursor-pointer hover:bg-[var(--yellow-color)] hover:text-gray-800 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 hover:brightness-110 hover:border-[var(--bg-color)]">
                Return to your quizzes?
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
