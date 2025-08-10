import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import MyMessages from "./MyMessages";

function MainMessages({categoryId}) {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages categoryId={categoryId}/>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default MainMessages;
