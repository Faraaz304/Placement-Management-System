"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50">
      <header className="w-full bg-indigo-700 text-white py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">AI Placement Management</h1>
          <div className="space-x-4">
            <button 
              onClick={() => router.push("/Login")}
              className="bg-white text-indigo-700 font-semibold py-2 px-4 rounded-md"
            >
              Sign In
            </button>
            <button 
              onClick={() => router.push("/Signup")}
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">AI-Powered</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-indigo-600">Placement Management System</h2>
        <p className="text-lg text-gray-600 mb-12">Streamline your placement process with advanced AI technology. Get personalized resume analysis, interview preparation, and job recommendations.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Smart Resume Analysis</h4>
            <p className="text-gray-600">Get detailed feedback and suggestions to improve your resume</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Interview Mastery</h4>
            <p className="text-gray-600">Practice with mock interviews tailored to your profile</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v4a1 1 0 001 1h3l3 3V4L7 7H4a1 1 0 00-1 1z" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-gray-800">Smart Job Matching</h4>
            <p className="text-gray-600">Find the perfect job opportunities based on your skills</p>
          </div>
        </div>
      </main>
    </div>
  );
}
