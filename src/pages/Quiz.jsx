import { useLocation } from "react-router-dom";

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
      <h1>Quiz</h1>
      <div>
        <p>Category: {categoryName || "Not selected"}</p>
        <p>Difficulty: {selectedDifficulty || "Any"}</p>
        <p>Type: {selectedQuizType || "Multiple choice"}</p>
        <div style={{ backgroundColor: categoryColor, padding: "10px" }}>
          Theme color preview
        </div>
      </div>
    </>
  );
}
