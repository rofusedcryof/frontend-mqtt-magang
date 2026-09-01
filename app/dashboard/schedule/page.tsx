"use client";
import React, { useState } from 'react';
import { Edit, Trash, Plus, X } from 'lucide-react';

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Production Schedule</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Production Schedule
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg bg-white shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">Settings</button>
          <button className="px-4 py-2 border rounded-lg bg-white shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">Export</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
            <tr>
              <th className="px-4 py-3 w-24">Actions</th>
              <th className="px-4 py-3">Machine</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <tr key={item} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => setIsModalOpen(true)} className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Edit className="w-4 h-4" /></button>
                  <button className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash className="w-4 h-4" /></button>
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">FILTER 1</td>
                <td className="px-4 py-3 text-gray-900">R-NP-777200-1</td>
                <td className="px-4 py-3 text-gray-900">2,000</td>
                <td className="px-4 py-3 text-gray-900">1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* MODAL EDIT SCHEDULE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Production Schedule</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Machine</label>
                <select className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium">
                  <option value="" disabled selected>Pilih Machine</option>
                  <option className="text-gray-900 bg-white">FILTER 1</option>
                  <option className="text-gray-900 bg-white">FILTER 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama product"
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                <input 
                  type="number" 
                  placeholder="Masukkan qty"
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input 
                  type="number" 
                  placeholder="Masukkan priority"
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2 rounded text-blue-600" defaultChecked /> Close modal on save
              </label>
              <button onClick={() => setIsModalOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}