import { ChoicesButton } from "../components/ChoicesButton";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <>
      <div className="flex flex-col p-10 items-center justify-center sm:p-10 relative animation-soft-pop-in ">
        <div className="about-text bg-[var(--orange-color)] text-[var(--bg-color)] p-4 sm:w-160 rounded-2xl sm:text-xl">
          <p className="text-justify">
            Bulb Up is a quiz website designed to brighten your brain, one quiz
            at a time. Whether you're reviewing trivia, testing your memory, or
            creating your own custom questions, Bulb Up helps you learn in a fun
            and gentle way.
            <br />
            <br />
            Built with simplicity in mind, it’s your space to grow knowledge at
            your own pace—no pressure, just progress.
          </p>
        </div>
        <div>
          <div className="home-choices mt-5 sm:mt-10">
            <Link to={"/Category"}>
              {" "}
              <ChoicesButton
                text="Start Quiz"
                description={"Browse through the categories and begin!"}
              />
            </Link>
            <Link to={"/Quiz"}>
              {" "}
              <ChoicesButton
                text="Surprise Me!"
                description={"Try a random quiz from the deck"}
              />
            </Link>

            <Link to={"/CreateQuiz"}>
              <ChoicesButton
                text="Create your own"
                description={"Make a quiz with your questions"}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
