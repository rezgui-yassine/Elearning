import Navbare from "../navbar/navbare";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

function Layouts() {
  const location = useLocation();

  return (
    <>
      {/* Afficher la navbar uniquement si l'URL n'est pas "/Dashboard" */}
      {location.pathname !== "/Dashboard" && <Navbare />}
      
      <Outlet />
      {!(
        location.pathname === "/login" || location.pathname === "/register"
      ) ? (
        <Footer />
      ) : null}
    </>
  );
}

export default Layouts;
