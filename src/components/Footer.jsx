export function Footer() {
  return (
    <footer className="pb-4 sm:py-4 sm:text-xl text-center">
      Powered by{" "}
      <a
        href="https://opentdb.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-[var(--yellow-color)] transition-colors duration-300"
      >
        Open Trivia Database API
      </a>
    </footer>
  );
}
