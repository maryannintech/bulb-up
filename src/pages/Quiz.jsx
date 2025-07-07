import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { QuizChoicesButtons } from "../components/QuizChoicesButtons";

export function Quiz() {
  const location = useLocation();
  const quizSettings = location.state || {};

  const {
    selectedCategory = "9",
    selectedDifficulty = "medium",
    selectedQuizType = "multiple",
    categoryColor = "#D97524",
    categoryName = "General Knowledge",
    score = 0,
    setScore = () => {}, // Default function to avoid errors if not provided
  } = quizSettings;

  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionChoices, setQuestionChoices] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentScore, setCurrentScore] = useState(score);

  let lastFetched = 0;

  useEffect(() => {
    let timer;
    timer = setTimeout(fetchQuizData, 2000);
    return () => clearTimeout(timer);

    async function fetchQuizData() {
      const now = Date.now();
      if (now - lastFetched < 5000) return;

      lastFetched = now;

      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedQuizType}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setQuizData(data.results);
        setQuestionChoices(
          data.results.map((question) => {
            if (selectedQuizType === "boolean") {
              return ["True", "False"];
            } else {
              return [
                question.correct_answer,
                ...question.incorrect_answers,
              ].sort(() => Math.random() - 0.5);
            }
          })
        );
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [selectedCategory, selectedDifficulty, selectedQuizType]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  function handleChoiceClick(choice) {
    console.log(`You clicked: ${choice}`);
    if (choice === quizData[currentQuestion].correct_answer) {
      console.log("Correct answer!");
      let newScore = currentScore + 1;
      setCurrentScore(newScore);
      setScore(newScore);
    } else {
      console.log("Wrong answer!");
    }

    setCurrentQuestion(currentQuestion + 1);
  }

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const isQuizCompleted = currentQuestion >= quizData.length;

  return (
    <>
      {!isQuizCompleted ? (
        <div
          className="mt-5 sm:mt-10 text-[var(--bg-color)] sm:text-2xl p-5 sm:p-10 sm:h-130 sm:overflow-hidden select-none"
          style={{ backgroundColor: categoryColor }}
        >
          <div className="flex justify-between flex-wrap ">
            <p>Category: {categoryName}</p>
            <div>
              <p>
                Question: {currentQuestion + 1}/{quizData.length}
              </p>
              <p>Score: {currentScore}</p>
            </div>
          </div>
          <div>
            <p className="text-center mt-5 text-xl sm:mt-10 sm:text-4xl">
              {quizData.length > 0
                ? decodeHtml(quizData[currentQuestion].question)
                : "Loading question..."}
            </p>
            {selectedQuizType === "boolean" ? (
              <div className="flex flex-col items-center mt-5 sm:mt-10 gap-4 mb-3">
                <QuizChoicesButtons
                  choices="True"
                  handleChoiceClick={(choice) => handleChoiceClick(choice)}
                />
                <QuizChoicesButtons
                  choices="False"
                  handleChoiceClick={(choice) => handleChoiceClick(choice)}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-5 sm:mt-10 sm:grid sm:grid-cols-2 gap-4 sm:gap-5 sm:max-w-130 mx-auto">
                {questionChoices.length > 0 &&
                  questionChoices[currentQuestion].map((choice, index) => (
                    <QuizChoicesButtons
                      key={index}
                      choices={decodeHtml(choice)}
                      handleChoiceClick={(choice) => handleChoiceClick(choice)}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="text-[var(--bg-color)] flex flex-col justify-center items-center mt-10 bg-[#D95724] py-10 h-90 select-none">
            <p className="text-2xl sm:text-4xl mb-3">
              Your brain bulb is up💡
            </p>
            <div className="text-center rounded-2xl">
              <p className="text-xl sm:text-2xl">
                You got {currentScore} / {quizData.length}
                <br />
                {currentScore >= 3
                  ? "Brilliant! You're really shining bright"
                  : "Still glowing..give it another shot!"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
