"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

function UserDashboardWrapper({
  children,
  menuType,
}: {
  children?: React.ReactNode;
  menuType?: "account-settings-menu" | "my-account-menu";
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 border-b bg-white sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <HamburgerMenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-64 lg:w-72 xl:w-80 bg-white border-r h-screen sticky top-0 overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white z-50 shadow-lg overflow-y-auto md:hidden">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboardWrapper;
