import React from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

function PdfComp({ file }) {
  // Create an instance of toolbarPlugin
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <div className="pdf-viewer-container">
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Toolbar />
        <Viewer 
          fileUrl={file} 
          plugins={[
            // Register plugins
            toolbarPluginInstance,
            // ... add more plugins here if needed
          ]}
        />
      </Worker>
    </div>
  );
}

export default PdfComp;
