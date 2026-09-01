"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Activity, Calendar, Settings, LogOut, Menu, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // State untuk mengontrol sidebar buka tutup
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Live Production', icon: Activity, path: '/dashboard/live-production' },
    { name: 'Production Schedule', icon: Calendar, path: '/dashboard/schedule' },
    { name: 'Master Machine', icon: Settings, path: '/dashboard/master-machine' },
  ];

  return (
    <div className="flex h-screen bg-[#F4F6F9] font-sans">
      {/* Sidebar Hidden */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64 flex' : 'hidden'}`}>
        <div className="flex flex-col items-center justify-center py-8 border-b border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Admin</h2>
          <div className="flex items-center text-sm text-emerald-500 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Online
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link href="/login" className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-bold">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-[#1E56D0] flex items-center justify-between px-6 text-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            {/* Hide Sidebar */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="hover:bg-blue-700 p-1 rounded transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Gambar Logo PT */}
            <div className="w-8 h-8 relative bg-white rounded-md p-0.5 flex items-center justify-center shadow-sm">
              <Image 
                src="/PT.jpg" 
                alt="Logo PT" 
                fill 
                className="object-contain p-0.5" 
              />
            </div>

            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="text-sm font-medium flex items-center gap-2">
            <User className="w-5 h-5" /> Admin
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}