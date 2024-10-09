import React, { useState } from 'react';
import Navbar from '../components/navbar';
import "../CSS/ResumeAnalyser.css";
import "../CSS/ResumeDisplay.css"; // Add a new CSS file for resume display

function ResumeAnalyser() {
    const [file, setFile] = useState(null);
    const [suggestions, setSuggestions] = useState('');
    const [fileURL, setFileURL] = useState('');

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setFileURL(URL.createObjectURL(uploadedFile));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please upload a resume file.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/analyze-resume', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result) {
                    setSuggestions(data.result);
                } else {
                    setSuggestions('No suggestions available.');
                }
            } else {
                setSuggestions(`Error analyzing resume: ${response.statusText}`);
            }
        } catch (error) {
            setSuggestions(`Error analyzing resume: ${error.message}`);
        }
    };

    return (
        <div className="resume-analyser-container">
            <Navbar />
            <div className="content">
                <div className="left-section">
                    <h1 className="title">Resume Feedback and Suggestions</h1>
                    <form className="resume-form" onSubmit={handleSubmit}>
                        <label className="file-label" htmlFor="resume">
                            <span className="material-icons-sharp">upload_file</span>
                            Upload Resume (PDF)
                        </label>
                        <input type="file" id="resume" accept=".pdf" onChange={handleFileChange} />
                        <button className="analyze-button" type="submit">Analyze Resume</button>
                    </form>
                    {suggestions && (
                        <div className="output">
                            <h2 className="suggestions-title">Suggestions:</h2>
                            <pre className="suggestions-content">{suggestions}</pre>
                        </div>
                    )}
                </div>
                {fileURL && (
                    <div className="right-section">
                        <h2 className="preview-title">Uploaded Resume:</h2>
                        <iframe src={fileURL} title="Resume Preview" className="resume-iframe"></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResumeAnalyser;
