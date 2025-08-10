// CustomAccordion.js
import React, { useState } from "react";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FileUpload from "./FileUpload";
import './CustomAccordion.css';

const CustomAccordion = ({ title, moduleId }) => { 
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion ${isOpen ? "active" : ""}`}>
      <div className={`accordion-header ${isOpen ? "active" : ""}`} onClick={toggleAccordion}>
        <p>{title}</p>
        <span className={`material-symbols-outlined ${isOpen ? "active" : ""}`}>
          <ArrowDropDownOutlinedIcon />
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <FileUpload moduleId={moduleId} moduleName={title} />
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
