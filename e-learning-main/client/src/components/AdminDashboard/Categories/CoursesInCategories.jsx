import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

export function CoursesInCategories() {
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des cours dans une catégorie</h1>
      <div className="d-flex justify-content-end mb-3">
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadPdf}>Ajouter pièce jointe</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Documents</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr key={index}>
                <td>{course._id}</td>
                <td>{course.name}</td>
                <td>
                  {course.attachments.length > 0 ? (
                    course.attachments.map((attachment, idx) => (
                      <a
                        key={idx}
                        href={attachment.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {attachment.name}
                      </a>
                    ))
                  ) : (
                    <span>Aucune pièce jointe</span>
                  )}
                </td>
                <td>
                  <Link
                    to={`/updateCourse/${course._id}`}
                    className="btn btn-primary me-2"
                  >
                    Modifier
                  </Link>
                  <Link
                    to={`/deleteCourse/${course._id}`}
                    className="btn btn-danger"
                  >
                    Supprimer
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
