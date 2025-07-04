export function Category() {
  return (
    <>
      <div className="mt-5">
        <p className="text-center text-orange italic sm:text-xl font-medium">
          Set your preference
        </p>
        <div>
          <label>Set difficulty</label>
          <select>
            <option value="any-difficulty">Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="multiple-choice">True or False</option>
          </select>
        </div>
      </div>
    </>
  );
}
