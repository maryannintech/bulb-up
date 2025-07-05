import { allCategories } from "../data/categories";
import { CategoryCard } from "../components/CategoryCard";
import { useState } from "react";

export function Category() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("any-difficulty");
  const [quizType, setQuizType] = useState("multiple-choice");
  const [searchCategory, setSearchCategory] = useState("");

  function handleCategoryClick(cat) {
    setCategory(cat.value);
    console.log(category);
  }

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
            <div className="flex gap-5 mt-2 items-center overflow-x-auto ">
              {allCategories.science.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#5C9A51"
                />
              ))}
            </div>
          </div>

          <div className="sm:mt-4">
            <p>History - Best Score: {score}</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto ">
              {allCategories.history.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#516F9A"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-4">
            <p>Politics - Best Score: {score}</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto ">
              {allCategories.politics.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#9A5151"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-5">
            <p>Entertainment - Best Score: {score} </p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto ">
              {allCategories.entertainment.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#91519A"
                />
              ))}
            </div>
          </div>

          <div>
            <p>Geography - Best Score: {score}</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto ">
              {allCategories.geography.map((category) => (
                <CategoryCard
                  key={category.id}
                  categoryName={category.name}
                  category={category}
                  functionHandle={handleCategoryClick}
                  color="#9A8B51"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
