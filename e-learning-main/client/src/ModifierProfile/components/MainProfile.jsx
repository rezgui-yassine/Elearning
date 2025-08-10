import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
// import Sidebar from "./Sidebar";

import MyProfile from "./MyProfile";
function MainProfile() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <MyProfile />
    </CssVarsProvider>
  );
}

export default MainProfile;
