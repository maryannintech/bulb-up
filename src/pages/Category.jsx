import { useState } from "react";
export function Category() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("any-difficulty");
  const [quizType, setQuizType] = useState("multiple-choice");
  const [searchCategory, setSearchCategory] = useState("");

  return (
    <>
      <div className="mt-5">
        <p className="text-center text-orange italic sm:text-xl font-medium">
          Set your preference
        </p>
        <div className="flex justify-evenly items-center mt-4 flex-wrap">
          <div className="flex flex-col items-center mb-2">
            <label htmlFor="difficulty">Set difficulty</label>
            <select id="difficulty" className="input-category">
              <option value="any-difficulty">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex flex-col items-center mb-2">
            <label htmlFor="quiz-type">Set quiz type</label>
            <select id="quiz-type" className="input-category">
              <option value="multiple-choice">Multiple Choice</option>
              <option value="multiple-choice">True or False</option>
            </select>
          </div>
          <div className="search-input flex flex-col items-center">
            <label htmlFor="search-category">Search Category</label>
            <input
              id="search-category"
              type="text"
              placeholder="Search for a category"
              className="input-category"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
