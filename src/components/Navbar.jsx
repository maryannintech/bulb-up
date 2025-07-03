import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <div className="name-logo text-center">
        <p className="name-nav-bar 2xl">
          Bulb <span>Up</span>
        </p>
        <img src=""></img>
      </div>
      <div className="nav-bar-buttons flex justify-evenly">
        <Link to={"/"}>
          <button className="cursor-pointer">Home</button>
        </Link>
        <Link to={"/Category"}>
          <button className="cursor-pointer">Play Quiz</button>
        </Link>
        <Link to={"/CreateQuiz"}>
          <button className="cursor-pointer">Create Quiz</button>
        </Link>
      </div>
    </>
  );
}
