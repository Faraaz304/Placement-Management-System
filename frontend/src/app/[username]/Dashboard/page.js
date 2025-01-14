"use client"
import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Chart from "@/app/components/Chart";
import MetricsCard from "@/app/components/MetricsCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="p-6 space-y-6">
          {/* Metrics Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard title="Total Companies" value="45" />
            <MetricsCard title="Students Registered" value="350" />
            <MetricsCard title="Placement Rate" value="85%" />
            <MetricsCard title="Ongoing Drives" value="8" />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart title="Placement Trends" type="bar" />
            <Chart title="Company Participation" type="pie" />
          </div>

          {/* Notifications Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
            <ul className="space-y-2">
              <li>New placement drive for XYZ Company added.</li>
              <li>Application deadline for ABC Company closes tomorrow.</li>
              <li>Interview scheduled for DEF Company on Jan 15th.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
