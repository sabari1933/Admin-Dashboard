import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");
console.log("token :", token);

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
