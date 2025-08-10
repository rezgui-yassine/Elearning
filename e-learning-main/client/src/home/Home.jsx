import CoursesCategories from "./CoursesCategories";
import PopularCourses from "./PopularCourses";
import Proud from "./Proud";
import Rate from "./Rate";

function Home() {
  return (
    <div>

      <Proud />
      <CoursesCategories />
      <PopularCourses />
      <Rate />
    </div>
  );
}

export default Home;
