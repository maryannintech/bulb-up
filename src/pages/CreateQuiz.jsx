import { useState, useEffect } from "react";
import { TermsAndDefinition } from "../components/TermsAndDefinition";
import { CategoryCard } from "../components/CategoryCard";
import { capitalizeFirstLetter } from "../utils/formatText";
import { categorieColors } from "../data/colors";
import { useNavigate } from "react-router-dom";

export function CreateQuiz() {
  const [searchCategory, setSearchCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [makeQuiz, setMakeQuiz] = useState(false);
  const [questions, setQuestions] = useState([1]);
  const [nextQuestionId, setNextQuestionId] = useState(2);
  const [editQuiz, setEditQuiz] = useState(false);
  const [userQuizzes, setUserQuizzes] = useState(
    JSON.parse(localStorage.getItem("userQuizzes") || "{}")
  );
  const [editFeedback, setEditFeedback] = useState("");
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  function handleMakeQuiz() {
    if (makeQuiz) {
      setMakeQuiz(false);
      setQuestions([1]);
      setNextQuestionId(2);
      setIsEditingQuiz(false);
      sessionStorage.removeItem("editingQuizId"); // Clear editing state
    } else {
      setMakeQuiz(true);
      setEditQuiz(false);
    }
  }

  function handleAddQuestion() {
    setQuestions((prev) => [...prev, nextQuestionId]);
    setNextQuestionId((prev) => prev + 1);
  }

  function handleDeleteQuestion(key) {
    if (questions.length <= 1) {
      setMakeQuiz(false);
      setQuestions([1]);
    } else {
      setQuestions((prev) => prev.filter((q) => q !== key));
    }
  }

  function handleSaveQuiz() {
    const categoryInput = document.getElementById("category-input");
    const titleInput = document.getElementById("title-input");

    const category = capitalizeFirstLetter(categoryInput.value.trim());
    const title = capitalizeFirstLetter(titleInput.value.trim());

    if (!category || !title) {
      alert("Please fill in all fields before saving the quiz.");
      return;
    }

    const questionData = questions.map((questionNum) => {
      const termInput = document.getElementById(`term-${questionNum}`);
      const definitionInput = document.getElementById(
        `definition-${questionNum}`
      );

      return {
        term: capitalizeFirstLetter(termInput?.value.trim()) || "",
        definition: capitalizeFirstLetter(definitionInput?.value.trim()) || "",
      };
    });

    const incompleteQuestions = questionData.some(
      (q) => !q.term || !q.definition
    );
    if (incompleteQuestions) {
      alert("Please fill in all terms and definitions before saving.");
      return;
    }

    const existingQuizzes = JSON.parse(
      localStorage.getItem("userQuizzes") || "{}"
    );

    const categoryExists = existingQuizzes[category];

    const assignedColor =
      categoryExists?.[0]?.color ||
      `#${categorieColors[Math.floor(Math.random() * categorieColors.length)]}`;

    const newQuiz = {
      id: Date.now(),
      category: category,
      title: title,
      questions: questionData,
      createdAt: new Date().toISOString(),
      color: assignedColor,
    };

    const updatedQuizzes = {
      ...existingQuizzes,
      [category]: [...(existingQuizzes[category] || []), newQuiz],
    };

    setUserQuizzes(updatedQuizzes);

    localStorage.setItem("userQuizzes", JSON.stringify(updatedQuizzes));

    setQuestions([1]);
    setNextQuestionId(2);
    setMakeQuiz(false);

    categoryInput.value = "";
    titleInput.value = "";

    setEditFeedback(`Quiz "${newQuiz.title}" has been saved successfully.`);
    setTimeout(() => {
      setEditFeedback("");
    }, 2000);
  }

  const navigateUserQuiz = useNavigate();

  function handleUserCategoryClick(quiz) {
    console.log("Quiz clicked:", quiz);
    navigateUserQuiz("/UserQuiz", {
      state: {
        categoryColor: quiz.color,
        categoryName: quiz.category,
        quizTitle: quiz.title,
        quizId: quiz.id,
        quizQuestions: quiz.questions,
        quizCreatedAt: quiz.createdAt,
      },
    });
  }

  function handleEditQuiz() {
    if (!editQuiz) {
      setEditQuiz(true);
    } else {
      setEditQuiz(false);
    }
  }

  function handleDeleteButton(quiz) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this quiz? This action cannot be undone."
    );
    if (confirmation) {
      console.log("Quiz deleted", quiz);
      const updatedQuizzes = { ...userQuizzes };
      updatedQuizzes[quiz.category] = updatedQuizzes[quiz.category].filter(
        (q) => q.id !== quiz.id
      );
      if (updatedQuizzes[quiz.category].length === 0) {
        delete updatedQuizzes[quiz.category];
        localStorage.removeItem(`userQuiz_${quiz.title}`);
      }

      localStorage.setItem("userQuizzes", JSON.stringify(updatedQuizzes));
      setUserQuizzes(updatedQuizzes);

      setEditFeedback(`Quiz "${quiz.title}" has been deleted successfully.`);
      setTimeout(() => {
        setEditFeedback("");
      }, 2000);
    }
  }

  function handleEditButton(quiz) {
    setMakeQuiz(true);
    setEditQuiz(false);
    setIsEditingQuiz(true);

    sessionStorage.setItem("editingQuizId", quiz.id.toString());

    setTimeout(() => {
      const categoryInput = document.getElementById("category-input");
      const titleInput = document.getElementById("title-input");

      if (categoryInput && titleInput) {
        categoryInput.value = quiz.category;
        titleInput.value = quiz.title;
      }

      const questionIds = quiz.questions.map((_, index) => index + 1);
      setQuestions(questionIds);
      setNextQuestionId(questionIds.length + 1);

      setTimeout(() => {
        quiz.questions.forEach((question, index) => {
          const termInput = document.getElementById(`term-${index + 1}`);
          const definitionInput = document.getElementById(
            `definition-${index + 1}`
          );

          if (termInput && definitionInput) {
            termInput.value = question.term;
            definitionInput.value = question.definition;
          }
        });
      }, 100);
    }, 100);
  }

  function handleUpdateButton() {
    const categoryInput = document.getElementById("category-input");
    const titleInput = document.getElementById("title-input");

    const category = capitalizeFirstLetter(categoryInput.value.trim());
    const title = capitalizeFirstLetter(titleInput.value.trim());

    if (!category || !title) {
      alert("Please fill in all fields before updating the quiz.");
      return;
    }

    const questionData = questions.map((questionNum) => {
      const termInput = document.getElementById(`term-${questionNum}`);
      const definitionInput = document.getElementById(
        `definition-${questionNum}`
      );

      return {
        term: capitalizeFirstLetter(termInput?.value.trim()) || "",
        definition: capitalizeFirstLetter(definitionInput?.value.trim()) || "",
      };
    });

    const incompleteQuestions = questionData.some(
      (q) => !q.term || !q.definition
    );
    if (incompleteQuestions) {
      alert("Please fill in all terms and definitions before updating.");
      return;
    }

    const editingQuizId = sessionStorage.getItem("editingQuizId");
    if (!editingQuizId) {
      alert("Error: No quiz selected for editing.");
      return;
    }

    const updatedQuizzes = { ...userQuizzes };
    let updatedQuiz = null;
    let originalCategory = null;

    Object.keys(updatedQuizzes).forEach((cat) => {
      const quizIndex = updatedQuizzes[cat].findIndex(
        (q) => q.id === parseInt(editingQuizId)
      );
      if (quizIndex !== -1) {
        originalCategory = cat;
        const originalQuiz = updatedQuizzes[cat][quizIndex];

        updatedQuiz = {
          ...originalQuiz,
          category: category,
          title: title,
          questions: questionData,
          updatedAt: new Date().toISOString(),
        };

        if (cat !== category) {
          // Remove from old category
          updatedQuizzes[cat].splice(quizIndex, 1);
          if (updatedQuizzes[cat].length === 0) {
            delete updatedQuizzes[cat];
          }

          updatedQuizzes[category] = [
            ...(updatedQuizzes[category] || []),
            updatedQuiz,
          ];
        } else {
          updatedQuizzes[cat][quizIndex] = updatedQuiz;
        }
      }
    });

    if (!updatedQuiz) {
      alert("Error: Quiz not found for updating.");
      return;
    }

    setUserQuizzes(updatedQuizzes);
    localStorage.setItem("userQuizzes", JSON.stringify(updatedQuizzes));

    sessionStorage.removeItem("editingQuizId");
    setIsEditingQuiz(false);

    setQuestions([1]);
    setNextQuestionId(2);
    setMakeQuiz(false);

    categoryInput.value = "";
    titleInput.value = "";

    questions.forEach((questionNum) => {
      const termInput = document.getElementById(`term-${questionNum}`);
      const definitionInput = document.getElementById(
        `definition-${questionNum}`
      );
      if (termInput) termInput.value = "";
      if (definitionInput) definitionInput.value = "";
    });

    setEditFeedback(
      `Quiz "${updatedQuiz.title}" has been updated successfully.`
    );
    setTimeout(() => {
      setEditFeedback("");
    }, 2000);
  }

  function handleSearchButton(e) {
    if (e.key === "Enter") {
      const searchTerm = e.target.value;
      setSearchCategory(searchTerm);
      searchThroughUserCategories(searchTerm);
    }
  }

  function searchThroughUserCategories(searchTerm) {
    if (!searchTerm.trim()) {
      setSearchResults({});
      return;
    }

    const results = {};
    const searchLower = searchTerm.toLowerCase();

    Object.entries(userQuizzes).forEach(([category, quizzes]) => {
      const filteredQuizzes = quizzes.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchLower) ||
          quiz.category.toLowerCase().includes(searchLower)
      );

      if (filteredQuizzes.length > 0) {
        results[category] = filteredQuizzes; // Store as object, not array
      }
    });

    setSearchResults(results);
  }

  function clearSearch() {
    setSearchCategory("");
    setSearchResults([]);
    document.getElementById("search-category").value = "";
  }

  function renderQuizCards(quizzesData) {
    return Object.entries(quizzesData).map(([categoryName, quizzes]) => (
      <div key={categoryName} className="mb-3">
        <h2 className="sm:text-xl mb-2">{categoryName}</h2>
        <div className="sm:text-xl flex gap-5 item-center overflow-x-auto">
          {quizzes.map((quiz) => (
            <div className="sm:overflow-hidden" key={quiz.id}>
              <CategoryCard
                categoryName={quiz.title}
                functionHandle={() => handleUserCategoryClick(quiz)}
                color={quiz.color}
              />
              {editQuiz ? (
                <div className="animate-fade-in">
                  <div className="flex gap-2 justify-start items-center mt-4 text-[var(--bg-color)] transform transition-all duration-500 ease-in-out">
                    <button
                      className="cursor-pointer bg-[#3CB371] rounded-full flex justify-center items-center px-4 py-1 hover:bg-[#2E8B57] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      onClick={() => handleEditButton(quiz)}
                    >
                      <i className="bx bx-edit-alt mr-1"></i> Edit
                    </button>
                    <button
                      className="cursor-pointer bg-[#C70039] rounded-full flex justify-center items-center px-4 py-1 hover:bg-[#c7003892] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                      onClick={() => handleDeleteButton(quiz)}
                    >
                      <i className="bx bx-trash mr-1"></i> Delete
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="mt-4 animation-soft-pop-in">
        <p className="text-center px-5 sm:text-xl text-[var(--orange-color)] italic pt-3">
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
              onKeyDown={(e) => handleSearchButton(e)}
            />
            {searchCategory && (
              <div>
                <button
                  onClick={clearSearch}
                  className="cursor-pointer text-[var(--bg-color)] px-3 py-1 rounded-full bg-[var(--blue-color)] hover:bg-[var(--orange-color)] hover:scale-105 hover:shadow-md transition-all duration-200 ease-in-out transform hover:brightness-110"
                  title="Clear search"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
        {Object.keys(userQuizzes).length > 0 && (
          <div
            className="sm:text-xl cursor-pointer flex justify-end items-center gap-2 sm:mr-5 bg-[var(--orange-color)] text-white rounded-lg mt-5  w-fit mx-auto px-4 py-2 shadow-lg hover:shadow-xl hover:scale-110 hover:bg-orange-600 transition-all duration-300 ease-in-out "
            onClick={handleEditQuiz}
          >
            {editQuiz ? (
              <i className="bx  bx-check"></i>
            ) : (
              <i className="bx  bx-edit-alt"></i>
            )}
            <button className="cursor-pointer">
              {editQuiz ? "Done Editing" : "Edit Quizzes"}
            </button>
          </div>
        )}
        <p className="text-center mt-4 mb-4 px-5">{editFeedback}</p>
        <div>
          <button
            className="cursor-pointer fixed bottom-6 right-6 bg-[var(--orange-color)] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110 hover:bg-orange-600 transition-all duration-300 ease-in-out flex items-center justify-center text-2xl font-bold z-50 transform hover:rotate-90"
            title={makeQuiz ? "Close quiz creation" : "Create a new quiz"}
            onClick={handleMakeQuiz}
          >
            {makeQuiz ? (
              <i className="bx bx-x"></i>
            ) : (
              <i className="bx  bx-plus"></i>
            )}
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
                      htmlFor="category-input"
                      className="text-[var(--bg-color)]"
                    >
                      Category
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="category-input"
                        type="text"
                        placeholder="Enter a category (e.g., 'Final Exam Reviewers', 'history')"
                        className="create-quiz-input h-24"
                      />
                    </div>
                  </div>
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
                </div>

                <div className="questions-container">
                  <p className="text-center text-[var(--bg-color)] sm:text-xl">
                    Add your terms and definitions
                  </p>
                  {questions.map((questionNum, index) => (
                    <TermsAndDefinition
                      key={questionNum}
                      id={`question-${questionNum}`}
                      questionNumber={index + 1}
                      handleAddQuestion={handleAddQuestion}
                      handleDeleteQuestion={() =>
                        handleDeleteQuestion(questionNum)
                      }
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-center align-center">
                  {isEditingQuiz ? (
                    <button
                      className="cursor-pointer text-[var(--bg-color)] flex justify-start items-center gap-3 text-xl mt-5 ml-5 active:bg-[var(--orange-color)] hover:bg-[var(--orange-color)] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out rounded-lg py-2 px-4 w-fit"
                      onClick={handleUpdateButton}
                    >
                      Update quiz <i className="bx  bx-edit"></i>
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer text-[var(--bg-color)] flex justify-start items-center gap-3 text-xl mt-5 ml-5 active:bg-[var(--orange-color)] hover:bg-[var(--orange-color)] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out rounded-lg py-2 px-4 w-fit"
                      onClick={handleSaveQuiz}
                    >
                      Create quiz <i className="bx bx-save"></i>
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div>
              <>
                {Object.keys(userQuizzes).length === 0 ? (
                  <p className=" sm:pt-5 px-4 text-center sm:text-xl text-gray-600">
                    No quizzes created yet. Click the + button to create your
                    first quiz.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center pl-5 sm:pl-10 mb-5">
                      <div className="overflow-x-auto">
                        {searchCategory && searchCategory ? (
                          Object.keys(searchResults).length > 0 ? (
                            renderQuizCards(searchResults)
                          ) : (
                            <>
                              <p className="text-red-500 mt-2">
                                No categories found for "{searchCategory}"
                              </p>
                              <button
                                onClick={clearSearch}
                                className="cursor-pointer text-sm bg-[var(--blue-color)] hover:bg-[var(--orange-color)] text-white px-3 py-1 rounded-full mt-2 transition-colors"
                              >
                                Show all categories
                              </button>
                            </>
                          )
                        ) : (
                          renderQuizCards(userQuizzes)
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
