"use client";

import React, { useState } from 'react';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [parsedData, setParsedData] = useState(null); // State to store parsed resume data

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setParsedData(null); // Reset parsed data on new upload
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload_resume', { // Adjust the URL as needed
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Success: ${data.message}`);
                setParsedData(data.data); // Set parsed resume data
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="max-w-lg w-full p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Upload Your Resume
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="file-upload"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Select a file:
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:border-blue-500 focus:ring-blue-500 hover:border-blue-400 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg"
                    >
                        Upload Resume
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-5 text-center text-sm font-medium ${
                            message.startsWith('Error') ? 'text-red-500' : 'text-green-600'
                        }`}
                    >
                        {message}
                    </p>
                )}
                {parsedData && (
                    <div className="mt-5 bg-gray-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-600 mb-3">
                            Parsed Resume Data:
                        </h3>
                        <pre className="text-sm text-gray-700 bg-white p-3 rounded-lg overflow-x-auto">
                            {JSON.stringify(parsedData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
