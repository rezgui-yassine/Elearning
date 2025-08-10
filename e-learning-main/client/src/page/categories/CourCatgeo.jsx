import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Box, Input } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";

export function CourCatgeo() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    // fetch all courses in categories
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/categories/getAllCoursesInCategory/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données:",
        error.message
      );
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadPdf = async (courseId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId); // Pass the courseId along with the file

    try {
      const response = await axios.post(
        "http://localhost:3000/api/courses/uploadAttachment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      fetchData(); // Refresh the course list after uploading the attachment
    } catch (error) {
      console.error("Erreur lors de l'upload du PDF :", error.message);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Nom", flex: 1 },
    {
      field: "attachments",
      headerName: "Documents",
      flex: 1,
      renderCell: (params) =>
        params.value.length > 0 ? (
          params.value.map((attachment, idx) => (
            <a key={idx} href={attachment.url} target="_blank" rel="noreferrer">
              {attachment.name}
            </a>
          ))
        ) : (
          <span>Aucune pièce jointe</span>
        ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <Link
            to={`/updateCourseTeacher/${row._id}`}
            style={{ textDecoration: "none", marginRight: "8px" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#0594D0", color: "#fff" }}
            >
              Modifier
            </Button>
          </Link>
          <Link
            to={`/deleteCourseTeacher/${row._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="error"
              style={{ backgroundColor: "#007198", color: "#fff" }}
            >
              Supprimer
            </Button>
          </Link>
        </Box>
      ),
    },
  ];

  const getRowId = (row) => row._id;

  return (
    <Box sx={{ mt: 5, mx: "auto", width: "80%" }}>
      <Header title={"Liste des cours dans une catégorie"} />
      {/* <Typography variant="h3" align="center" gutterBottom>
        Liste des cours dans une catégorie
      </Typography> */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={uploadPdf} variant="contained" color="primary">
          Ajouter pièce jointe
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          getRowId={getRowId}
          style={{ border: "1px solid #ccc" }}
        />
      </div>
    </Box>
  );
}

// test
