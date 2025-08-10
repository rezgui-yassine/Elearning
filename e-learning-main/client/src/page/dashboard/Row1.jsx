import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import Card from "./card";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4 } from "./data";

const Row1 = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
    >
      <Card
        icon={<EmailIcon
          sx={{ fontSize: "23px", color: theme.palette.secondary.main }} />}
        title={"12,361"}
        subTitle={"Emails Sent"}
        increase={"+14%"}
        data={data1} scheme={"nivo"}      />

    
    </Stack>
  );
};

export default Row1;
