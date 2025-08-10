import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { FaClock, FaUser } from "react-icons/fa";

function ScrollableCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/all"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const joinCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/categories/join/${categoryId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCategories(); // Optionally, update the list of categories after joining
    } catch (error) {
      console.error("Error joining category:", error);
    }
  };

  const calculatePeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days`;
  };

  return (
    <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table of categories">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Durée</TableCell>
                <TableCell>Inscriptions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  hover
                  key={category._id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Avatar
                      alt={category.name}
                      src={`http://localhost:3000/api/categories/getImage/${category._id}`}
                    />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    {calculatePeriod(category.dateDebut, category.dateFin)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${category.users.length} Étudiants`}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default ScrollableCategories;
