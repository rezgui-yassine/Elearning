// import Banner from "../components/Home/Banner";
import CoursesCategories from "../home/CoursesCategories";
import PopularCourses from "../home/PopularCourses";
import Proud from "../home/Proud";
import Rate from "../home/Rate";

function Home() {
  return (
    <div>
      {/* <Banner /> */}
      <Proud />
      <CoursesCategories />
      <PopularCourses />
      <Rate />
    </div>
  );
}

export default Home;
