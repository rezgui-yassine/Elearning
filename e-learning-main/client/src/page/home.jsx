// import Banner from "../components/Home/Banner";
import Navbare from "../components/navbar/navbare";
import CoursesCategories from "../home/CoursesCategories";
import PopularCourses from "../home/PopularCourses";
import Proud from "../home/Proud";
import Rate from "../home/Rate";
import About from "./About/About";
import HeroSection from "./Hero/HeroSection";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Services from "./Services/Services";
import Card from "./Card/Card";
import Testimonials from "./Testimonials/Testimonials";
import React, { Suspense } from 'react';
import { GlobalStyle } from "./globalStyles";
import Footer from "../components/Footer/Footer";


function Home() {
  

  return (
    <div style={{backgroundColor:""}}>


<Suspense fallback={null}>
<GlobalStyle />

<ScrollToTop />

<Navbare/>
<HeroSection/>
<About/>
{/* <Services/> */}
<PopularCourses />
<Rate /> 
<Footer/>

</Suspense>
      {/* <Banner /> */}

      {/* <Proud/>
      <CoursesCategories />
     */}
    </div>
  );
}

export default Home;
