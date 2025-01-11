import React, { useState } from 'react';

export default function Uploader() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 p-2 border border-gray-300 rounded-md cursor-pointer"
      />
      <button 
        onClick={handleUpload} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Upload
      </button>
    </div>
  );
}
