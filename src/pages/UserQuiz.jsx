import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { QuizChoicesButtons } from "../components/QuizChoicesButtons";
import { shuffleArray } from "../utils/shuffle-arr";

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
      setScore(score + 1);
    } else {
      setFeedback(`❌ Incorrect! The correct answer is: ${correctTerm}`);
    }

    setTimeout(() => {
      setFeedback("");
      setCurrentQuestion(currentQuestion + 1);
    }, 2000);
  }

  useEffect(() => {
    if (currentQuestion >= quizQuestions.length) {
      setIsQuizCompleted(true);
    } else {
    }
  }, [currentQuestion, quizQuestions.length]);

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
                <p>Best Score: 0</p>
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
          <div className="text-center mt-5">
            Quiz completed! Your final score is {score} out of{" "}
            {quizQuestions.length}.
          </div>
        </>
      )}
    </>
  );
}
