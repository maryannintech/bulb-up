import { useLocation } from "react-router-dom";
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
  return (
    <>
      <div
        className="mt-5 sm:mt-10 text-[var(--bg-color)] sm:text-2xl p-5 sm:p-10 max-h-full sm:h-130 overflow-hidden"
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
          <p className="text-center mt-5 text-xl sm:mt-10 sm:text-3xl">
            BASTA DITO YUNG QUESTION
          </p>
          <div className="mt-5 sm:mt-10 flex justify-center items-center gap-4 flex-wrap sm:gap-5">
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
        </div>
      </div>
    </>
  );
}
