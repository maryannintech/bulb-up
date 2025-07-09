export function TermsAndDefinition() {
  return (
    <>
      <div className="">
        <div className="flex justify-center flex-col items-center gap-5 mt-3 flex-wrap py-4 animation-soft-pop-in">
          <div className="flex justify-center items-center gap-2">
            <input
              id="term-input"
              placeholder="Enter term"
              className="create-quiz-terms-definition"
            ></input>
          </div>
          <label htmlFor="term-input" className="text-[var(--bg-color)]">
            Term
          </label>
        </div>
        <div className="flex justify-center flex-col items-center gap-5 flex-wrap py-4 animation-soft-pop-in">
          <div className="flex justify-center items-center gap-2">
            <input
              id="definition-input"
              placeholder="Enter definition"
              className="create-quiz-terms-definition"
            ></input>
          </div>
          <label htmlFor="defition-input" className="text-[var(--bg-color)]">
            Definition
          </label>
        </div>
      </div>
    </>
  );
}
