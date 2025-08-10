import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faEye } from "@fortawesome/free-solid-svg-icons";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Box } from "@mui/material";
import PdfComp from "../AdminDashboard/Courses/PdfComp";

// Configure PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.standardFontDataUrl = "/path/to/standard/fonts";

const AttachmentPage = () => {
  const { courseId } = useParams();
  const [allImage, setAllImage] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [studentReview, setStudentReview] = useState("");
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    getPdf();
    // Récupérer les informations sur l'utilisateur lors du chargement du composant
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/auth/me`);
      const userInfo = response.data.data;

      // Add user information to the userInfos array
      setUserInfos((prevUserInfos) => [...prevUserInfos, userInfo]);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getPdf = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/courses/get-files/${courseId}`
      );
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const showPdf = (file) => {
    const absoluteFilePath = `http://localhost:3000/api/courses/get-files/${file}`;
    const pdfWindow = window.open();
    pdfjs.getDocument(absoluteFilePath).promise.then((pdf) => {
      const numPages = pdf.numPages;
      const pagesPromises = Array.from({ length: numPages }, (_, i) =>
        pdf.getPage(i + 1).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          return page.render(renderContext).promise.then(() => canvas);
        })
      );
      Promise.all(pagesPromises).then((pages) => {
        pages.forEach((canvas) => {
          pdfWindow.document.body.appendChild(canvas);
        });
      });
    });
  };

  const downloadPdf = (file) => {
    const link = document.createElement("a");
    link.href = `http://localhost:3000/api/courses/get-files/${file}`;
    link.download = file;
    link.click();
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage

      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      // Call the authentificateToken function to get the user's ID
      const response = await axios.get(`http://localhost:3000/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = response.data.user._id;
      console.log("User ID:", userId);

      if (!userId) {
        console.error("User ID not found in session");
        return;
      }

      if (!studentReview.trim()) {
        alert("Veuillez entrer un avis avant de l'envoyer.");
        return;
      }

      // Now you can perform your request with the user's ID
      const reviewResponse = await axios.post(
        `http://localhost:3000/api/courses/add-review/${courseId}`,
        {
          review: studentReview,
          userId: userId,
          courseId: courseId,
        }
      );

      alert("Avis envoyé avec succès !");
      setStudentReview("");
      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);
    }
  };

  return (
    <Box className="p-4 App" style={{ fontFamily: "Arial, sans-serif" }}>
      <Box
        className="p-4 bg-white rounded shadow uploaded"
        style={{ marginTop: "70px" }}
      >
        <h4>PDFs téléchargés :</h4>
        <div className="row">
          {allImage.map((data, index) => (
            <div key={index} className="mb-3 col-lg-4">
              <Card>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      size="2x"
                      className="mr-2"
                    />
                    <h5>{data.name}</h5>
                  </div>
                  <div>
                    <SaveAltIcon
                      onClick={() => downloadPdf(data.file)}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      size="1x"
                      onClick={() => showPdf(data.file)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Box>
      <div className="mt-4">
        <h4>Ajouter un avis :</h4>
        {userInfos[0] && (
          <p>Vous êtes connecté en tant que : {userInfos[0].username}</p>
        )}{" "}
        <textarea
          value={studentReview}
          onChange={(e) => setStudentReview(e.target.value)}
          placeholder="Ajouter un avis..."
          className="form-control"
        />
        <Button onClick={submitReview} className="mt-2">
          Envoyer l'avis
        </Button>
      </div>
      {pdfFile && (
        <Box className="pdf-container">
          <PdfComp file={pdfFile} />
        </Box>
      )}
    </Box>
  );
};

export default AttachmentPage;
