import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { QuizChoicesButtons } from "../components/QuizChoicesButtons";

export function Quiz() {
  const location = useLocation();
  const quizSettings = location.state || {};
  const {
    selectedCategory,
    selectedDifficulty,
    selectedQuizType,
    categoryColor,
    categoryName,
  } = quizSettings;

  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let lastFetched = 0; // to track the last fetch time

  useEffect(() => {
    async function fetchQuizData() {
      const now = Date.now();
      if (now - lastFetched < 5000) return; // ignore calls within 5 seconds

      lastFetched = now;
      try {
        setError(null);

        const response = await fetch(
          `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedQuizType}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Quiz Data:", data.results);
        setQuizData(data.results);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (selectedCategory && selectedDifficulty && selectedQuizType) {
      fetchQuizData();
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

  return (
    <>
      <div
        className="mt-5 sm:mt-10 text-[var(--bg-color)] sm:text-2xl p-5 sm:p-10 sm:h-115 sm:overflow-hidden"
        style={{ backgroundColor: categoryColor }}
      >
        <div className="flex justify-between flex-wrap ">
          <p>Category: {categoryName}</p>
          <div>
            <p>Question: 1/10</p>
            <p>Score: 0</p>
          </div>
        </div>
        <div>
          <p className="text-center mt-5 text-xl sm:mt-10 sm:text-4xl">
            {quizData.length > 0 ? quizData[0].question : "Loading question..."}
          </p>
          {selectedQuizType === "boolean" ? (
            <div className="flex flex-col items-center mt-5 sm:mt-10 gap-4">
              <QuizChoicesButtons
                choices="True"
                handleChoiceClick={(choice) =>
                  console.log(`You clicked: ${choice}`)
                }
              />
              <QuizChoicesButtons
                choices="False"
                handleChoiceClick={(choice) =>
                  console.log(`You clicked: ${choice}`)
                }
              />
            </div>
          ) : (
            <div className="mt-5 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-5 max-w-md mx-auto">
              <QuizChoicesButtons
                choices="Choice 1"
                handleChoiceClick={(choice) =>
                  console.log(`You clicked: ${choice}`)
                }
              />
              <QuizChoicesButtons
                choices="Choice 2"
                handleChoiceClick={(choice) =>
                  console.log(`You clicked: ${choice}`)
                }
              />
              <QuizChoicesButtons
                choices="Choice 3"
                handleChoiceClick={(choice) =>
                  console.log(`You clicked: ${choice}`)
                }
              />
              <QuizChoicesButtons
                choices="Choice 4"
                handleChoiceClick={(choice) =>
                  console.log(`You clicked: ${choice}`)
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
