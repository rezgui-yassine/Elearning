import {
  Box,
  Badge,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
  Menu,
  MenuItem,
  Link as MuiLink, // Rename Link from @mui/material to MuiLink
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import { alpha } from "@mui/material/styles";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import moment from "moment";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(0); // State for notifications count
  const [anchorEl, setAnchorEl] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events or notifications here if needed
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const start = moment().startOf("day").toISOString();
      const end = moment().endOf("day").toISOString();
      const response = await axios.get(
        `http://localhost:3000/api/calander/getEvents?start=${start}&end=${end}`
      );
      setEvents(response.data);
      setNotifications(response.data.length);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleNotificationClick = async (event) => {
    setAnchorEl(event.currentTarget);
    fetchEvents();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box flexGrow={1} />

        <Stack direction={"row"}>
          {theme.palette.mode === "light" ? (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setMode((prevMode) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color="inherit"
            >
              <LightModeOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setMode((prevMode) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color="inherit"
            >
              <DarkModeOutlinedIcon />
            </IconButton>
          )}

          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          <Link to="/gereProfile/student">
            <IconButton color="inherit" sx={{ color: 'white' }}  >
              <SettingsOutlinedIcon />
            </IconButton>
          </Link>
{/* 
          <IconButton color="inherit">
            <Person2OutlinedIcon />
          </IconButton> */}
        </Stack>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {/* Display events in the menu */}
        {events.map((event, index) => (
          <MenuItem
            key={index}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {event.title}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {moment(event.date).format("MMM DD, YYYY")}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default TopBar;