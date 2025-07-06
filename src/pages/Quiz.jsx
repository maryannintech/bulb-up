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
            Dito yung question
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
            <div className="mt-5 flex flex-col justify-center gap-4 items-center sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:w-130 sm:mx-auto">
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
