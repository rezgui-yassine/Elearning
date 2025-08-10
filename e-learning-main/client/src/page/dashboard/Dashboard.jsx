import React from "react";
import CardDashboard from "./CardDashboard";
import TableUsers from "../../components/AdminDashboard/Users/TableUsers";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Button from "@mui/material/Button";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import ScrollableCategories from "../ScrollableCategories/ScrollableCategories";
// import UsersCards from "../../components/AdminDashboard/profileCards/UsersCards";

const Dashboard = () => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: theme.spacing(2) }} // Add margin bottom to the stack
      >
        <Header
          isDashboard={true}
          title={"LinkHub"}
          subTitle={"Bienvenue dans votre tableau de bord"}
        />
      </Stack>

      <Box sx={{ mb: theme.spacing(3) }}>
        {" "}
        {/* Add margin bottom to the component */}
        <CardDashboard />
      </Box>

      <Box sx={{ mb: theme.spacing(3) }}>
        {" "}
        {/* Add margin bottom to the component */}
        <Typography variant="h6">Tableaux de Utulisateurs</Typography>
        <TableUsers />
      </Box>

      <Box sx={{ mb: theme.spacing(3) }}>
        {" "}
        {/* Add margin bottom to the component */}
        <Row3 />
      </Box>
      <Box sx={{ mb: theme.spacing(3) }}>
        {" "}
        {/* Add margin bottom to the component */}
        <ScrollableCategories />
      </Box>
    </div>
  );
};

export default Dashboard;
