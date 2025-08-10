import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { pdfjs } from 'react-pdf';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEye } from '@fortawesome/free-solid-svg-icons'; 
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box } from '@mui/material';
import PdfComp from "./PdfComp";

// Configure PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.standardFontDataUrl = '/path/to/standard/fonts';

const ReadCourse = () => {
  const { courseId } = useParams();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [allImage, setAllImage] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/api/courses/get-files/${courseId}`);
      setAllImage(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files:", error);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const result = await axios.post(
        `http://localhost:3000/api/courses/upload/${courseId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setShowModal(false);
      getPdf();
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const downloadPdf = (file) => {
    const absoluteFilePath = `http://localhost:3000/api/courses/get-files/${file}`;
    const link = document.createElement('a');
    link.href = absoluteFilePath;
    link.download = 'file.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showPdf = (file) => {
    const absoluteFilePath = `http://localhost:3000/api/courses/get-files/${file}`;
    const pdfWindow = window.open();
    pdfjs.getDocument(absoluteFilePath).promise.then(pdf => {
      const numPages = pdf.numPages;
      const pagesPromises = Array.from({ length: numPages }, (_, i) =>
        pdf.getPage(i + 1).then(page => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          return page.render(renderContext).promise.then(() => canvas);
        })
      );
      Promise.all(pagesPromises).then(pages => {
        pages.forEach(canvas => {
          pdfWindow.document.body.appendChild(canvas);
        });
      });
    });
  }

  return (
    <Box className="p-4 App" style={{  fontFamily: 'Arial, sans-serif' }}>
      <Button variant="primary" onClick={() => setShowModal(true)} style={{ position: 'absolute', top: '120px', right: '20px', marginRight: '10px' }}>Ajouter PDF</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitImage}>
            <Form.Group controlId="pdfName">
              <Form.Label>Nom du PDF</Form.Label>
              <Form.Control type="text" placeholder="Entrez le nom" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="pdfFile">
              <Form.Label>Télécharger PDF</Form.Label>
              <Form.Control type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Soumettre
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Box className="p-4 bg-white rounded shadow uploaded" style={{ marginTop: '70px' }}>
        <h4>PDFs téléchargés :</h4>
        <div className="row">
          {allImage.map((data, index) => (
            <div key={index} className="mb-3 col-lg-4">
              <Card>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faFilePdf} size="2x" className="mr-2" />
                    <h5>{data.name}</h5>
                  </div>
                  <div>
                    <SaveAltIcon onClick={() => downloadPdf(data.file)} style={{ cursor: 'pointer' }} />
                    <FontAwesomeIcon icon={faEye} size="1x" onClick={() => showPdf(data.file)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Box>
      {pdfFile && 
        <Box className="pdf-container">
          <PdfComp file={pdfFile} />
        </Box>
      }
    </Box>
  );
}

export default ReadCourse;
