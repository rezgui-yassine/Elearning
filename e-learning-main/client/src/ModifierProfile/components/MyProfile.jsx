import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

export default function MyProfile() {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    telephone: "",
    address: "",
    bio: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setFormData({
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        telephone: userData.telephone || "", // handle case if telephone is null
        address: userData.address || "", // handle case if address is null
        avatar: userData.avatar || "", // handle case if avatar is null
        bio: userData.bio || "", // handle case if bio is null
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, avatar: imageUrl });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const {
        id,
        firstName,
        lastName,
        email,
        telephone,
        address,
        avatar,
        bio,
      } = formData; // Include bio in destructuring
      const updatedData = {
        id,
        firstName,
        lastName,
        email,
        telephone,
        address,
        avatar,
        bio, // Include bio in updatedData object
      };

      await axios.put(
        `http://localhost:3000/api/users/updateUserss/${id}`,
        updatedData
      );

      Swal.fire("Success!", "Profile updated successfully.", "success");

      setFormData(updatedData);
    } catch (error) {
      console.error("Error saving user:", error);
      Swal.fire("Error!", "Failed to save user.", "error");
    }
  };

  return (
    <Box
      sx={{ flex: 1, width: "1400px", height: "100vh", overflowY: "none" }}
      className="prof"
    >
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "2000px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
          height: "100%",
        }}
      >
        <Card sx={{ backgroundColor: "white" }}>
          <Box sx={{ mb: 1 }} style={{ height: "80px" }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the
              networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img src={formData.avatar} loading="lazy" alt="" />
              </AspectRatio>
              <input
                ref={fileInputRef}
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 100,
                  top: 170,
                  boxShadow: "sm",
                }}
                onClick={handleButtonClick}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <Input
                    size="sm"
                    placeholder="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Status</FormLabel>
                  <Select size="sm" defaultValue="active">
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    size="sm"
                    type="tel"
                    startDecorator={<PhoneRoundedIcon />}
                    placeholder="Telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    startDecorator={<HomeRoundedIcon />}
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    size="sm"
                    type="password"
                    startDecorator={<LockRoundedIcon />}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Bio</FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    startDecorator={<DescriptionRoundedIcon />}
                    placeholder="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid" onClick={handleUpdateProfile}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
