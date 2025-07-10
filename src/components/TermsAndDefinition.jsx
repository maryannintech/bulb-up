export function TermsAndDefinition({
  questionNumber,
  handleAddQuestion,
  handleDeleteQuestion,
  handleDefinitionChange,
  handleTitleChange,
}) {
  return (
    <>
      <div className="bg-gray-500  border-t-1 border-b-1 sm:border-1 sm:rounded-xl mt-5 sm:w-120 mx-auto px-10 text-[var(--bg-color)]">
        <p className="pt-3 text-xl">Question: {questionNumber}</p>
        <div className="flex justify-center flex-col items-center gap-2 mt-3 flex-wrap  animation-soft-pop-in">
          <div>
            <input
               id={`term-${questionNumber}`} 
              placeholder="Enter term"
              className="create-quiz-terms-definition"
              onChange={handleTitleChange}
            ></input>
          </div>
          <label htmlFor="term-input" className="text-[var(--bg-color)]">
            Term
          </label>
        </div>
        <div className="flex justify-center flex-col items-center gap-2 flex-wrap  animation-soft-pop-in">
          <div>
            <input
              id={`definition-${questionNumber}`}
              placeholder="Enter definition"
              className="create-quiz-terms-definition"
              onChange={handleDefinitionChange}
            ></input>
          </div>
          <label htmlFor="defition-input" className="text-[var(--bg-color)]">
            Definition
          </label>
        </div>
        <div className="flex justify-center items-center gap-2 mt-3 mb-3">
          <button
            className="text-xl cursor-pointer bg-[var(--bg-color)] text-gray-500 hover:text-[var(--bg-color)] hover:bg-gray-600 w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300"
            title="Add new question"
            onClick={handleAddQuestion}
          >
            <i className="bx  bx-plus"></i>
          </button>
          <button
            className="text-xl cursor-pointer bg-[var(--bg-color)] text-gray-500 hover:text-[var(--bg-color)] hover:bg-red-700 w-10 h-10 rounded-full flex justify-center items-center transition-all duration-300"
            title="Delete question"
            onClick={handleDeleteQuestion}
          >
            <i className="bx  bx-trash"></i>
          </button>
        </div>
      </div>
    </>
  );
}
