import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryIds: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoriesResponse = await axios.get(
        "http://localhost:3000/api/categories/all"
      );
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }

    try {
      const coursesResponse = await axios.get(
        "http://localhost:3000/api/courses/all"
      );
      setCourses(coursesResponse.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous vraiment supprimer ce cours ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/courses/delete/${id}`);
          setCourses(courses.filter((course) => course._id !== id));
          Swal.fire("Succès !", "Cours supprimé avec succès.", "success");
        } catch (error) {
          console.error("Erreur lors de la suppression du cours :", error);
          Swal.fire("Erreur !", "Échec de la suppression du cours.", "error");
        }
      }
    });
  };

  const getCategoryName = (categoryIds) => {
    const category = categories.find((cat) => cat._id === categoryIds);
    return category ? category.name : "";
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (category) => category._id === formData.categoryIds
      );
      if (!selectedCategory) {
        throw new Error("Veuillez sélectionner une catégorie");
      }

      const updatedCourse = {
        ...selectedCourse,
        name: formData.name,
        categoryIds: formData.categoryIds,
      };

      await axios.put(
        `http://localhost:3000/api/courses/update/${selectedCourse._id}`,
        updatedCourse
      );
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Cours mis à jour avec succès",
        timer: 1000,
      });

      setFormData({
        name: "",
        categoryIds: "",
      });
      setSelectedCourse(null);

      fetchData();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du cours :", error.message);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de la mise à jour du cours",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (category) => category._id === formData.categoryIds
      );
      if (!selectedCategory) {
        throw new Error("Veuillez sélectionner une catégorie");
      }

      const courseData = { ...formData };
      await axios.post("http://localhost:3000/api/courses/create", courseData);
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Cours créé avec succès",
        timer: 1000,
      });

      setFormData({
        name: "",
        categoryIds: "",
      });

      fetchData();
    } catch (error) {
      console.error("Erreur lors de la création du cours :", error.message);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Échec de la création du cours",
      });
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      categoryIds: course.categoryIds,
    });
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Nom de cours",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "categoryIds",
      headerName: "Nom de catégorie",
      width: 350,
      align: "center", // Align the content to center
      headerAlign: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {getCategoryName(params.row.categoryIds)}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 400,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(row._id)}
            style={{
              marginRight: "8px",
              backgroundColor: "#007198",
              color: "#fff",
            }} // Add right margin to delete button
            className="me-2"
          >
            supprimer
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(row)}
            style={{
              marginRight: "8px",
              backgroundColor: "#0594D0",
              color: "#fff",
            }} // Ajouter
            className="me-2"
          >
            modifier
          </Button>
          <Link to={`/readCourse/${row._id}`}>
            <Button
              variant="contained"
              color="info"
              style={{
                marginRight: "8px",
                backgroundColor: "#3498DB",
                color: "#fff",
              }}
              className="ms-2"
            >
              Document
            </Button>
          </Link>
        </>
      ),
    },
  ];

  const getRowId = (row) => row._id;

  return (
    <Box>
      <Header title={"Cours"} subTitle={"Gestion des cours"} />

      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid rows={courses} columns={columns} getRowId={getRowId} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Ajouter / Modifier un cours</Typography>
        <form onSubmit={selectedCourse ? handleUpdate : handleSubmit}>
          <TextField
            name="name"
            label="Nom"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            name="categoryIds"
            label="Catégorie"
            value={formData.categoryIds}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Sélectionner une catégorie</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" color="primary">
              {selectedCourse ? "Mettre à jour le cours" : "Ajouter un cours"}
            </Button>
            {selectedCourse && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectedCourse(null)}
              >
                Annuler
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Courses;
