import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <Link href={"/"}>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
          Logout
        </button>
        </Link>
  
      </div>
    </header>
  );
}