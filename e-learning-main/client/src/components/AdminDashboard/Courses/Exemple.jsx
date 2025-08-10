// Example.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CustomAccordion from './CustomAccordion';
import { useParams } from 'react-router-dom';
import './Exemple.css';

function Example() {
  const [show, setShow] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [modules, setModules] = useState([]);
  const { courseId } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddModule = () => {
    const newModule = { 
      id: modules.length + 1, 
      name: moduleName
    };
    setModules([...modules, newModule]);
    setModuleName("");
    handleClose();

  };

  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules));
  }, [modules]);

  return (
    <div>
      <div className="App">
        <button type="button" className="button" variant="primary" onClick={handleShow}>
          <span className="button__text">Add Item</span>
          <span className="button__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" className="svg">
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button> 
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Module</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => { e.preventDefault(); handleAddModule(); }} className='form-container'>
              <label className="wrapper" >
                <input 
                  type="text" 
                  placeholder="Enter module name" 
                  name="text" 
                  className="input" 
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  required 
                />
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddModule}>Add Module</Button>
          </Modal.Footer>
        </Modal>

        <div className="module-list">
          {modules.map((module) => (
            <CustomAccordion key={module.id} title={module.name} moduleId={courseId} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Example;
