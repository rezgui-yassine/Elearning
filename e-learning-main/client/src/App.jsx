import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import "bootstrap/dist/css/bootstrap.min.css";
import QuizState from "./components/TeacherDashboard/context/QuizState";


function App() {
  return (
    <>
      <QuizState>
        <RouterProvider router={router} />

      </QuizState>
    </>
  );
}

export default App;