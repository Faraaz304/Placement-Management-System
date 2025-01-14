import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="p-6 text-xl font-bold">Placement System</div>
      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          <li className="hover:bg-gray-700 p-2 rounded-lg">Home</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">Dashboard</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">Placement Drives</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">Companies</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">Applications</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">Reports</li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">Settings</li>
        </ul>
      </nav>
    </aside>
  );
}
