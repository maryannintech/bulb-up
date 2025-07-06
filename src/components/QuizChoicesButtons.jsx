export function QuizChoicesButtons({ choices, handleChoiceClick }) {
  return (
    <>
    <button onClick={() => handleChoiceClick(choices)} className="cursor-pointer w-55 border-3 border-[var(--bg-color)] text-[var(--bg-color)] text-lg sm:text-2xl py-1 rounded-md hover:bg-[var(--bg-color)] hover:text-black transition-colors duration-300">
        {choices}
    </button>
    </>
  )
}
