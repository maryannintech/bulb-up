import { allCategories } from "../data/categories";
import { CategoryCard } from "../components/CategoryCard";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

export function Category() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quizType, setQuizType] = useState("multiple");
  const [searchCategory, setSearchCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [searchResults, setSearchResults] = useState([]);

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

  function searchThroughAllCategories(searchTerm) {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    const searchLower = searchTerm.toLowerCase();

    Object.entries(allCategories).forEach(([groupName, categories]) => {
      categories.forEach((cat) => {
        if (cat.name.toLowerCase().includes(searchLower)) {
          results.push({
            ...cat,
            groupName: groupName,
            color: getCategoryGroupColor(groupName),
          });
        }
      });
    });

    setSearchResults(results);
  }

  function getCategoryGroupColor(groupName) {
    const colorMap = {
      science: "#5C9A51",
      history: "#516F9A",
      politics: "#9A5151",
      entertainment: "#91519A",
      geography: "#9A8B51",
      art: "#E34040",
    };
    return colorMap[groupName] || "#666666";
  }

  function handleSearchChange(e) {
    if (e.key === "Enter") {
      const searchTerm = e.target.value;
      setSearchCategory(searchTerm);
      searchThroughAllCategories(searchTerm);
    }
  }

  function handleNumQuestionsChange(e) {
    setNumOfQuestions(e.target.value);
  }

  function clearSearch() {
    setSearchCategory("");
    setSearchResults([]);
    document.getElementById("search-category").value = "";
  }

  return (
    <>
      <div className="mt-5 animation-soft-pop-in">
        <p className="text-center text-orange italic sm:text-xl font-medium">
          Set your preference
        </p>
        <div className="flex justify-evenly items-center mt-4 flex-wrap px-15">
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
            <label htmlFor="num-questions">Set number of question</label>
            <select
              id="num-questions"
              className="input-category"
              onChange={handleNumQuestionsChange}
            >
              {numQuestions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="search-input flex flex-col items-center mt-3">
            <label htmlFor="search-category">Search Category</label>
            <div className="flex items-center gap-2">
              <input
                id="search-category"
                type="text"
                placeholder="Search for a category (e.g., 'music', 'history')"
                className="input-category"
                onKeyDown={(e) => handleSearchChange(e)}
              />
              {searchCategory && (
                <button
                  onClick={clearSearch}
                  className="cursor-pointer text-[var(--bg-color)] px-3 py-1 rounded-full bg-[var(--blue-color)] hover:bg-[var(--orange-color)] hover:scale-105 hover:shadow-md transition-all duration-200 ease-in-out transform hover:brightness-110"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 sm:pl-10 mt-4 sm:text-xl mb-5">
          {searchCategory ? (
            <>
              {searchResults.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <p>Search results for: "{searchCategory}"</p>
                  </div>
                  <div className="flex gap-5 mt-2 items-center overflow-x-auto flex-wrap">
                    {searchResults.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        categoryName={cat.name}
                        category={cat}
                        functionHandle={(category) =>
                          handleCategoryClick(category, cat.color)
                        }
                        color={cat.color}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-red-500 mt-2">
                    No categories found for "{searchCategory}"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="cursor-pointer text-sm bg-[var(--blue-color)] hover:bg-[var(--orange-color)] text-white px-3 py-1 rounded-full mt-2 transition-colors"
                  >
                    Show all categories
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
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

              <div className="mt-3 sm:mt-4">
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

              <div className="mt-4 sm:mt-5">
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

              <div className="mt-4 sm:mt-5">
                <p>Art</p>
                <div className="flex gap-5 mt-2 items-center overflow-x-auto">
                  {allCategories.art.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      categoryName={cat.name}
                      category={cat}
                      functionHandle={(category) =>
                        handleCategoryClick(category, "#E34040")
                      }
                      color="#E34040"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
