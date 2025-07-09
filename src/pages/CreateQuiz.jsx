import { useState, useEffect } from "react";
import { TermsAndDefinition } from "../components/TermsAndDefinition";

export function CreateQuiz() {
  const [searchCategory, setSearchCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [makeQuiz, setMakeQuiz] = useState(false);
  const [questions, setQuestions] = useState([1]);
  const [nextQuestionId, setNextQuestionId] = useState(2);

  function handleMakeQuiz() {
    if (makeQuiz) {
      setMakeQuiz(false);
      setQuestions([1]);
      setNextQuestionId(2);
    } else {
      setMakeQuiz(true);
    }
  }

  function handleAddQuestion() {
    setQuestions((prev) => [...prev, nextQuestionId]);
    setNextQuestionId((prev) => prev + 1); 
  }

  function handleDeleteQuestion(key) {
    setQuestions((prev) => prev.filter((q) => q !== key));
  }

  return (
    <>
      <div className="mt-4 animation-soft-pop-in">
        <p className="text-center text-[var(--orange-color)] italic px-4">
          This is where you’ll find your created quizzes
        </p>
        <div className="search-input flex flex-col items-center mt-3">
          <label htmlFor="search-category">Search Category</label>
          <div className="flex items-center gap-2">
            <input
              id="search-category"
              type="text"
              placeholder="Search for a category (e.g., 'math quiz terms', 'history')"
              className="input-category"
            />
          </div>
        </div>
        <div>
          <button
            className="cursor-pointer fixed bottom-6 right-6 bg-[var(--orange-color)] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center text-2xl font-bold z-50 transform hover:rotate-90"
            title="Create Quiz"
            onClick={handleMakeQuiz}
          >
            <i className="bx  bx-plus"></i>
          </button>
        </div>
        <div className="mt-5">
          {makeQuiz ? (
            <>
              <div className="bg-gray-600 py-4 sm:py-10">
                <p className="text-center text-[var(--bg-color)] sm:text-2xl">
                  Create your quiz
                </p>
                <div className="flex justify-center gap-5 items-center flex-wrap py-4 animation-soft-pop-in">
                  <div>
                    <label
                      htmlFor="title-input"
                      className="text-[var(--bg-color)]"
                    >
                      Title
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="title-input"
                        type="text"
                        placeholder="Enter a title (e.g., 'math quiz terms', 'history')"
                        className="create-quiz-input h-24"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description-input"
                      className="text-[var(--bg-color)]"
                    >
                      Description
                    </label>
                    <div className="flex items-center gap-2">
                      <textarea
                        id="description-input"
                        placeholder="Enter a description (e.g., 'A quiz about math terms', 'A quiz about history')"
                        className="create-quiz-input h-24"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="questions-container">
                  <p className="text-center text-[var(--bg-color)] sm:text-xl">
                    Add your terms and defitions
                  </p>
                  {questions.map((questionNum, index) => (
                    <TermsAndDefinition
                      key={questionNum}
                      questionNumber={index + 1}
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() =>
                        handleDeleteQuestion(questionNum)
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-center align-center"></div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
