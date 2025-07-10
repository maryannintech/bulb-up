import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function UserQuiz() {
  const location = useLocation();
  const userQuiz = location.state || {};
  const {
    categoryColor,
    categoryName,
    quizTitle,
    quizId,
    quizQuestions,
    quizDescription,
    quizCreatedAt,
  } = userQuiz;

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    console.log("UserQuiz component mounted with data:", userQuiz);
  }, [userQuiz]);

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
                <p>Quiz: {quizTitle}</p>
              </div>

              <div>
                <p>Score: 0</p>
                <p>Best Score: 0</p>
              </div>
            </div>
            <div className="animation-soft-pop-in ">
              <p className="sm:text-3xl text-[var(--bg-color)] text-center mt-4 transition-all duration-500 ease-in-out animate-fade-in">
                {userQuiz.quizQuestions[currentQuestion].definition}
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
