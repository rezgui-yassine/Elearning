import { createBrowserRouter } from "react-router-dom";
import MiniDrawer from "../home/MiniDrawer";
import Home from "../page/home";
import Team from "../page/team/Team";
import Dashboard from "../page/dashboard/Dashboard";
import Contacts from "../page/contacts/Contacts";
import Calendar from "../page/calendar/Calendar";
import NotFound from "../page/notFound/NotFound";
import Invoices from "../page/invoices/Invoices";
import Geography from "../page/geography/Geography";
import Form from "../page/form/Form";
import FAQ from "../page/faq/FAQ";
import PieChart from "../page/pieChart/PieChart";
import CreateCourse from "../components/AdminDashboard/Courses/CreateCourse";
import DeleteCourse from "../components/AdminDashboard/Courses/DeleteCourse";
import UpdateCourse from "../components/AdminDashboard/Courses/UpdateCourse";
import ReadCourse from "../components/AdminDashboard/Courses/ReadCourse";
import MainCourses from "../components/AdminDashboard/Courses/MainCourses";
import CreateCategories from "../components/AdminDashboard/Categories/CreateCategories";
import MainCategories from "../components/AdminDashboard/Categories/MainCategories";
import UpdateCategories from "../components/AdminDashboard/Categories/UpdateCategories";
// import { CoursesInCategories } from "../components/AdminDashboard/Categories/CoursesInCategories";
import Login from "../components/Login/Login";
import Registre from "../components/Registre/Registre";
import ActivationPage from "../components/ActivationPage/ActivationPage";
import MainUsers from "../components/AdminDashboard/Users/MainUsers";
import Courses from "../page/courses/Courses";
import CategoriesManagement from "../page/categories/CategoriesManagement";
import { CourCatgeo } from "../page/categories/CourCatgeo";
import TeachDrawer from "../components/TeacherDashboard/Home/TeachDrawer";
import DrawerStudent from "../components/StydentDashboard/Home/DrawerStudent";
import DashboardStudent from "../components/StydentDashboard/Pages/dashboard/DashboardStudent";
import ProfilStudent from "../components/StydentDashboard/Pages/Profile/ProfilStudent";
import CategoriesCards from "../components/categoriesCards/CategoriesCards";
import AddQuiz from "../components/TeacherDashboard/Pages/addQuiz/AddQuiz";
import HomeQuiz from "../components/TeacherDashboard/Pages/addQuiz/HomeQuiz";
import CalanderEvents from "../components/TeacherDashboard/Pages/calenderEvents/CalanderEvents";
import PlayQuizEntry from "../components/TeacherDashboard/Pages/addQuiz/PlayQuizEntry";
import CoursAtachment from "../components/categoriesCards/CoursAtachment";
import AttachmentPage from "../components/categoriesCards/AttachmentPage";
import MainMessages from "../messages/components/MainMessages";
import MainProfile from "../ModifierProfile/components/MainProfile";
import UsersCards from "../components/AdminDashboard/profileCards/UsersCards";
import TableUsers from "../components/AdminDashboard/Users/TableUsers";
import BarChartPage from "../page/barChart/BarChartPage ";
import PieChartComponent from "../page/pieChart/PieChartComponent";
import DashboardFormatteur from "../components/TeacherDashboard/Pages/dashboard/DashboardFormatteur";
import EventsStudents from "../components/StydentDashboard/Pages/calanderEvent/EventsStudents";
import CategoriesCardsTeacher from "../components/TeacherDashboard/Pages/CategoriesCardsTeacher";
import CoursAttachmentTeacher from "../components/TeacherDashboard/Pages/CoursAttachmentTeacher";

//
export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  // {path:"/loginHome",element:<HomeLogin/>},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Registre /> },
  { path: "/confirm/:activationCode", element: <ActivationPage /> },
  { path: "/mainUsers", element: <MainUsers /> },
  { path: "/teachDrawer", element: <TeachDrawer /> },

  {
    element: <MiniDrawer />,
    children: [
      {
        path: "/dashboard/admin", // Corrected path for Dashboard
        element: <Dashboard />,
      },
      {
        path: "/tableUsers",
        element: <TableUsers />,
      },
      { path: "/usersCards", element: <UsersCards /> },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/courses/:courseId",
        element: <Contacts />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },

      {
        path: "/mainCourses",
        element: <MainCourses />,
      },
      // {
      //   path: "/coursesManagment/admin",
      //   element: <Courses />,
      // },
      {
        path: "/gereProfile/admin",
        element: <ProfilStudent />,
      },
      {
        path: "/invoices",
        element: <Invoices />,
      },
      { path: "/mainUsers", element: <MainUsers /> },
      {
        path: "/geography",
        element: <Geography />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/barchat/admin",
        element: <BarChartPage />,
      },

      {
        path: "/category",
        element: <CategoriesManagement />,
      },
      {
        path: "/courCatgeo/:id",
        element: <CourCatgeo />,
      },
      {
        path: "/createCourse",
        element: <CreateCourse />,
      },

      {
        path: "/deleteCourse/:id",
        element: <DeleteCourse />,
      },
      {
        path: "/updateCourse/:id",
        element: <UpdateCourse />,
      },
      // {
      //   path: "/pieChartComponent",
      //   element: <PieChartComponent />,
      // },
      {
        path: "/readCourse/:courseId",
        element: <ReadCourse />,
      },
      {
        path: "/createCategory",
        element: <CreateCategories />,
      },
      {
        path: "/mainCategories",
        element: <MainCategories />,
      },
      {
        path: "/updateCategory/:id",
        element: <UpdateCategories />,
      },
      // {
      //   path: "/cousesInCategories/:id",
      //   element: <CoursesInCategories />,
      // },
    ],
  },

  {
    element: <TeachDrawer />,
    children: [
      {
        path: "/dashboard/teacher",
        element: <DashboardFormatteur />,
      },

      {
        path: "/gereProfile/teacher",
        element: <ProfilStudent />,
      },
      {
        path: "/addQuiz/teacher",
        element: <AddQuiz />,
      },
      {
        path: "/homeQuiz/teacher",
        element: <HomeQuiz />,
      },
      {
        path: "/calanderEvents/teacher",
        element: <CalanderEvents />,
      },

      {
        path: "/AllCategories",
        element: <CategoriesCards />,
      },
      {
        path: "/calendar/teacher",
        element: <Calendar />,
      },
      {
        path: "/pie/teacher",
        element: <PieChart />,
      },

      {
        path: "/notfound/teacher",
        element: <NotFound />,
      },
      {
        path: "/invoices/teacher",
        element: <Invoices />,
      },

      {
        path: "/geography/teacher",
        element: <Geography />,
      },
      {
        path: "/form/teacher",
        element: <Form />,
      },
      {
        path: "/faq/teacher",
        element: <FAQ />,
      },
      {
        path: "/bar/teacher",
        element: <BarChartPage />,
      },
      {
        path: "/coursesManagmentteacher",
        element: <Courses />,
      },
      {
        path: "/categoryteacher",
        element: <CategoriesCardsTeacher />,
      },
      {
        path: "/courCatgeoTeacher/:id",
        element: <CourCatgeo />,
      },
      {
        path: "/deleteCourseTeacher/:id",
        element: <DeleteCourse />,
      },
      {
        path: "/updateCourseTeacher/:id",
        element: <UpdateCourse />,
      },
      {
        path: "/readCourseTeacher/:courseId",
        element: <ReadCourse />,
      },
      {
        path: "/courCatgeoTeacher/:id",
        element: <CourCatgeo />,
      },
      {
        path: "/coursAtachmentTeacher/:categoryId",
        element: <CoursAttachmentTeacher />,
      },
    ],
  },

  {
    element: <DrawerStudent />,
    children: [
      {
        path: "/dashboard/student",
        element: <DashboardStudent />,
      },
      { path: "/mainMessages", element: <MainMessages /> },

      {
        path: "/gereProfile/student",
        element: <ProfilStudent />,
      },
      { path: "/mainProfile/student", element: <MainProfile /> },
      {
        path: "/AllCategories/student",
        element: <CategoriesCards />,
      },
      {
        path: "/coursAtachment/:categoryId",
        element: <CoursAtachment />,
      },
      {
        path: "/readCourse/student/:courseId",
        element: <AttachmentPage />,
      },
      {
        path: "/EventsStudents/student",
        element: <EventsStudents />,
      },
      {
        path: "/affichQuiz/student",
        element: <PlayQuizEntry />,
      },
      {
        path: "/pie/student",
        element: <PieChart />,
      },

      {
        path: "/notfound/student",
        element: <NotFound />,
      },
      {
        path: "/invoices/student",
        element: <Invoices />,
      },

      {
        path: "/geography/student",
        element: <Geography />,
      },
      {
        path: "/form/student",
        element: <Form />,
      },
      {
        path: "/faq/student",
        element: <FAQ />,
      },
      {
        path: "/bar/student",
        element: <BarChartPage />,
      },
    ],
  },
]);
