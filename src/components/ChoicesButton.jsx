export function ChoicesButton({ text, description }) {
  return (
    <>
      <div className="flex items-center gap-5 flex-wrap mt-4">
        <button className="flex items-center rounded-full bg-[var(--blue-color)] text-[var(--bg-color)] px-5 py-1.5 sm:text-xl cursor-pointer">
          <span>{text}</span>
          <i className="bx  bx-arrow-right "></i>
        </button>
        <p className="italic text-[var(--orange-color))] sm:text-xl">{description}</p>
      </div>
    </>
  );
}
