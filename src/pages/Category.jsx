import { allCategories } from "../data/categories";
import { CategoryCard } from "../components/CategoryCard";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Category() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quizType, setQuizType] = useState("multiple");
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(5);

  let numQuestions = [];

  for (let i = 5; i <= 50; i += 5) {
    numQuestions.push(i);
  }

  const navigate = useNavigate();

  function handleCategoryClick(cat, categoryColor) {
    setCategory(cat.value);
    setCategoryName(cat.name);

    navigate("/Quiz", {
      state: {
        selectedCategory: cat.value,
        selectedDifficulty: difficulty,
        selectedQuizType: quizType,
        categoryColor: categoryColor,
        categoryName: cat.name,
        numOfQuestions: numOfQuestions,
      },
    });
  }

  function handleDifficultyChange(e) {
    setDifficulty(e.target.value);
  }

  function handleQuizTypeChange(e) {
    setQuizType(e.target.value);
  }

  function handleSearchChange(e) {
    setSearchCategory(e.target.value);
  }

  function handleNumQuestionsChange(e) {
    setNumOfQuestions(e.target.value);
  }

  return (
    <>
      <div className="mt-5 animation-soft-pop-in ">
        <p className="text-center text-orange italic sm:text-xl font-medium">
          Set your preference
        </p>
        <div className="flex justify-evenly items-center mt-4 flex-wrap">
          <div className="flex flex-col items-center mb-2">
            <label htmlFor="difficulty">Set difficulty</label>
            <select
              id="difficulty"
              className="input-category"
              onChange={handleDifficultyChange}
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
              onChange={handleQuizTypeChange}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
            </select>
          </div>

          <div className="flex flex-col items-center mb-2">
            <label htmlFor="num-questions">Set number of quiz</label>
            <select
              id="num-questions"
              className="input-category"
              onChange={handleNumQuestionsChange}
            >
              {numQuestions.map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="search-input flex flex-col items-center">
            <label htmlFor="search-category">Search Category</label>
            <input
              id="search-category"
              type="text"
              placeholder="Search for a category"
              className="input-category"
              value={searchCategory}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="px-5 sm:pl-10 mt-4 sm:text-xl mb-5">
          <div>
            <p>Science</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto">
              {allCategories.science.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  categoryName={cat.name}
                  category={cat}
                  functionHandle={(category) =>
                    handleCategoryClick(category, "#5C9A51")
                  }
                  color="#5C9A51"
                />
              ))}
            </div>
          </div>

          <div className="sm:mt-4">
            <p>History</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto">
              {allCategories.history.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  categoryName={cat.name}
                  category={cat}
                  functionHandle={(category) =>
                    handleCategoryClick(category, "#516F9A")
                  }
                  color="#516F9A"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-4">
            <p>Politics</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto">
              {allCategories.politics.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  categoryName={cat.name}
                  category={cat}
                  functionHandle={(category) =>
                    handleCategoryClick(category, "#9A5151")
                  }
                  color="#9A5151"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-5">
            <p>Entertainment</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto">
              {allCategories.entertainment.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  categoryName={cat.name}
                  category={cat}
                  functionHandle={(category) =>
                    handleCategoryClick(category, "#91519A")
                  }
                  color="#91519A"
                />
              ))}
            </div>
          </div>

          <div>
            <p>Geography</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto">
              {allCategories.geography.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  categoryName={cat.name}
                  category={cat}
                  functionHandle={(category) =>
                    handleCategoryClick(category, "#9A8B51")
                  }
                  color="#9A8B51"
                />
              ))}
            </div>
          </div>

          <div className="mt-4 ">
            <p>Art</p>
            <div className="flex gap-5 mt-2 items-center overflow-x-auto">
              {allCategories.art.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  categoryName={cat.name}
                  category={cat}
                  functionHandle={(category) =>
                    handleCategoryClick(category, "#9A8B51")
                  }
                  color="#951A7F"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
