import React, { useState } from "react";

export default function ResumeUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [response, setResponse] = useState(null);
    const [file, setFile] = useState(null); // To store the selected file

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Store the selected file
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setResponse({ error: "Please select a file to upload." });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsUploading(true);
            const res = await fetch("http://127.0.0.1:5000/analyze-resume", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const result = await res.json();
                setResponse(result); // Set the response from the server
            } else {
                setResponse({ error: "Failed to upload resume." });
            }
        } catch (error) {
            console.error("Error uploading resume:", error);
            setResponse({ error: "Error uploading resume." });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Upload Your Resume
            </h3>

            {/* File Input (hidden, triggered by button) */}
            <input
                type="file"
                id="resumeUpload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Upload Button */}
            <button
                className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium"
                onClick={() => document.getElementById("resumeUpload").click()}
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Choose Resume to Upload"}
            </button>

            {/* Upload Action Button */}
            {file && (
                <button
                    className="w-full mt-4 py-2 px-4 text-white bg-green-500 hover:bg-green-600 rounded-lg font-medium"
                    onClick={handleUpload}
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Resume"}
                </button>
            )}

            {/* Response Display */}
            {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold">Response:</h4>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
