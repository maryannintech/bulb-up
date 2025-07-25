import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import lightBulbImage from "../../public/images/light-bulb.png";

export function Navbar() {
  return (
    <>
      <div className="mt-10 relative">
        <div className="name-logo text-center flex justify-center items-center">
          <p className="name-nav-bar 2xl text-right text-6xl text-[#D95724]">
            Bulb <span className="block text-yellow">Up</span>
          </p>
          <img
            src={lightBulbImage}
            alt="Light bulb logo"
            className="w-18 rotate-20 relative ml-3"
          ></img>
        </div>
        <div className="nav-bar-buttons flex justify-center gap-4 items-center mt-4 flex-wrap">
          <Link to={"/"}>
            <button className="nav-bar-button">Home</button>
          </Link>
          <Link to={"/Category"}>
            <button className="nav-bar-button">Take Quiz</button>
          </Link>
          <Link to={"/CreateQuiz"}>
            <button className="nav-bar-button">My Quizzes</button>
          </Link>
        </div>
      </div>
    </>
  );
}
