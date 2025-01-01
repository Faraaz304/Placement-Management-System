'use client'
import React from 'react';

export default function StudentDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Job Opportunities Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h2 className="text-lg font-semibold mb-2">Job Opportunities</h2>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-gray-600 text-sm">Active job listings</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Jobs
          </button>
        </div>

        {/* Upcoming Interviews Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h2 className="text-lg font-semibold mb-2">Upcoming Interviews</h2>
          <p className="text-3xl font-bold text-purple-600">3</p>
          <p className="text-gray-600 text-sm">Scheduled interviews</p>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            View Schedule
          </button>
        </div>

        {/* Training Resources Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h2 className="text-lg font-semibold mb-2">Training Resources</h2>
          <p className="text-3xl font-bold text-green-600">25</p>
          <p className="text-gray-600 text-sm">Available courses</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Access Training
          </button>
        </div>

        {/* Applications Card */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-yellow-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 className="text-lg font-semibold mb-2">My Applications</h2>
          <p className="text-3xl font-bold text-yellow-600">5</p>
          <p className="text-gray-600 text-sm">Active applications</p>
          <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            Track Status
          </button>
        </div>

        {/* Recent Activities Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {[
                "Applied for Software Developer position at Tech Corp",
                "Completed Mock Interview Session",
                "Updated Resume",
                "Scheduled interview with Innovation Labs",
                "Completed Python Assessment"
              ].map((activity, index) => (
                <div key={index} className="py-2 border-b border-gray-200">
                  <p className="text-gray-600">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
