"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-gray-50">
      
      {/* Background Pattern*/}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: "url('/PT.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px'
        }}
      ></div>

      {/* Card Form Register */}
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100 relative z-10">
        <div className="flex flex-col items-center mb-6">
          
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 relative">
              <Image 
                src="/PT.jpg" 
                alt="Logo Performa Mahardika Indonesia" 
                fill 
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-950">Performa Mahardika Indonesia</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-500 text-sm mt-1">Join us today to get started</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name here" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder:text-gray-400 bg-white" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@gmail.com" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder:text-gray-400 bg-white" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder:text-gray-400 bg-white pr-10" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Repeat your password" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 placeholder:text-gray-400 bg-white pr-10" 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="button" className="w-full bg-blue-500 text-white font-medium py-2.5 rounded-lg hover:bg-blue-600 transition mt-2">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
          <span className="w-full border-t border-gray-200"></span>
          <span className="px-3 bg-white text-xs">OR</span>
          <span className="w-full border-t border-gray-200"></span>
        </div>

        <button className="w-full mt-6 bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg flex items-center justify-center hover:bg-gray-50 transition text-sm">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
}