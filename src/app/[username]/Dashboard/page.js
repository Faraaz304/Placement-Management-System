"use client";
import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import ResumeUpload from "@/app/components/ResumeUpload";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6 space-y-6">
          {/* Resume Upload Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Resume Upload</h3>
            <ResumeUpload />
          </div>
        </div>
      </div>
    </div>
  );
}
