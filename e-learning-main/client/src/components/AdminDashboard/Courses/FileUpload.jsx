// FileUpload.js
import React, { useRef, useState } from "react";
import axios from "axios";
import './FileUpload.css';

const FileUpload = ({ moduleId, moduleName }) => { 
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [name, setName] = useState(""); 

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setName(event.target.files[0].name); // Mettre à jour le nom du fichier
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (!selectedFile || !name) return;

    try {
      setUploadStatus("uploading");
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", moduleName); 
      
      const response = await axios.post(
        `http://localhost:3000/api/courses/upload/${moduleId}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setUploadStatus("done");
    

    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("select");
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!selectedFile && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-symbols-outlined">upload</span> Upload File
        </button>
      )}

      {selectedFile && (
        <>
          <div className="file-card">
            <div className="file-info">
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>
                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
              </div>
              {uploadStatus === "select" ? (
                <button onClick={clearFileInput}>
                  <span className="material-symbols-outlined close-icon">close</span>
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>check</span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === 'uploading' ? "Upload" : "Done"}
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
