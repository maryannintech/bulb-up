import { useLocation } from "react-router-dom";
export function UserQuiz() {
  const location = useLocation();
  const userQuiz = location.state || {};
  const {
    categoryColor,
    categoryName,
    quizTitle,
    quizId,
    quizQuestions,
    quizDescription,
    quizCreatedAt,
  } = userQuiz;
  return <h1>User quiz</h1>;
}
