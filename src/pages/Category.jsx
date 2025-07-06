import { allCategories } from "../data/categories";
import { CategoryCard } from "../components/CategoryCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Quiz } from "./Quiz";

export function Category() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("any-difficulty");
  const [quizType, setQuizType] = useState("multiple-choice");
  const [searchCategory, setSearchCategory] = useState("");

  function handleCategoryClick(cat) {
    setCategory(cat.value);
  }

  function handleDifficultyChange(e) {
    setDifficulty(e.target.value);
  }

  function handleQuizTypeChange(e) {
    setQuizType(e.target.value);
  }

  // Separate useEffect for each state variable
  useEffect(() => {
    console.log("Difficulty changed to:", difficulty);
  }, [difficulty]);

  useEffect(() => {
    console.log("Category changed to:", category);
  }, [category]);

  useEffect(() => {
    console.log("Quiz type changed to:", quizType);
  }, [quizType]);

  useEffect(() => {
    console.log("Search category changed to:", searchCategory);
  }, [searchCategory]);

  let score = 0;

  return (
    <>
      <div className="mt-5">
        <p className="text-center text-orange italic sm:text-xl font-medium">
          Set your preference
        </p>
        <div className="flex justify-evenly items-center mt-4 flex-wrap">
          <div className="flex flex-col items-center mb-2">
            <label htmlFor="difficulty">Set difficulty</label>
            <select
              id="difficulty"
              className="input-category"
              onChange={(e) => handleDifficultyChange(e)}
            >
              <option value="any-difficulty">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex flex-col items-center mb-2">
            <label htmlFor="quiz-type">Set quiz type</label>
            <select
              id="quiz-type"
              className="input-category"
              onChange={(e) => handleQuizTypeChange(e)}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
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

        <div className="px-5 sm:pl-10 mt-4 sm:text-xl mb-5">
          <div>
            <p>Science - Best Score: {score}</p>
            <Link
              to="/Quiz"
              className="flex gap-5 mt-2 items-center overflow-x-auto "
            >
              {allCategories.science.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#5C9A51"
                />
              ))}
            </Link>
          </div>

          <div className="sm:mt-4">
            <p>History - Best Score: {score}</p>

            <Link
              to="/Quiz"
              className="flex gap-5 mt-2 items-center overflow-x-auto"
            >
              {allCategories.history.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#516F9A"
                />
              ))}
            </Link>
          </div>

          <div className="mt-4 sm:mt-4">
            <p>Politics - Best Score: {score}</p>
            <Link
              to="/Quiz"
              className="flex gap-5 mt-2 items-center overflow-x-auto"
            >
              {allCategories.politics.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#9A5151"
                />
              ))}
            </Link>
          </div>

          <div className="mt-4 sm:mt-5">
            <p>Entertainment - Best Score: {score} </p>

            <Link
              to="/Quiz"
              className="flex gap-5 mt-2 items-center overflow-x-auto"
            >
              {allCategories.entertainment.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#91519A"
                />
              ))}
            </Link>
          </div>

          <div>
            <p>Geography - Best Score: {score}</p>
            <Link
              to="/Quiz"
              className="flex gap-5 mt-2 items-center overflow-x-auto"
            >
              {allCategories.geography.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#9A8B51"
                />
              ))}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
