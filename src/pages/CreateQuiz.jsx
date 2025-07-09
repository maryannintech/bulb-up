import { useState, useEffect } from "react";
export function CreateQuiz() {
  const [searchCategory, setSearchCategory] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  return (
    <>
      <div className="mt-4 animation-soft-pop-in px-4">
        <p className="text-center text-[var(--orange-color)] italic">This is where you’ll find your created quizzes</p>
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

          </div>
      </div>
    </>
  );
}
