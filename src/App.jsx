import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { CreateQuiz } from "./pages/CreateQuiz";
import { Quiz } from "./pages/Quiz";
import { UserQuiz } from "./pages/UserQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/CreateQuiz" element={<CreateQuiz />} />
          <Route path="/Quiz" element={<Quiz/>}></Route>
          <Route path="/UserQuiz" element={<UserQuiz />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
