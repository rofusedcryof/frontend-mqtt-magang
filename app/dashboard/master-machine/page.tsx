"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Edit, X } from 'lucide-react';

export default function MasterMachinePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataMesin = [
    { no: 1, kode: 'MC-FBF-01', nama: 'FILTER 1', area: 'Line A', target: '2,500', status: 'Aktif' },
    { no: 2, kode: 'MC-CMF-01', nama: 'CMF 1', area: 'Line B', target: '1,800', status: 'Nonaktif' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Master Data Mesin</h2>
          <p className="text-gray-500 text-sm mt-1">Kelola spesifikasi dan target produksi mesin</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 w-1/2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari nama atau kode mesin..." className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 bg-white" />
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Tambah Mesin Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Kode Mesin</th>
              <th className="px-4 py-3">Nama Mesin</th>
              <th className="px-4 py-3">Area / Line</th>
              <th className="px-4 py-3 text-right">Target (Unit/Jam)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataMesin.map((item) => (
              <tr key={item.no} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{item.no}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.kode}</td>
                <td className="px-4 py-3 text-blue-600 font-medium">{item.nama}</td>
                <td className="px-4 py-3 text-gray-900">{item.area}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{item.target}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Edit className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL REGISTRASI MESIN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Form Registrasi Mesin Produksi</h3>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Kolom Kiri */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-blue-700 border-l-4 border-blue-600 pl-2">IDENTITAS MESIN</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mesin *</label>
                  <input type="text" placeholder="Masukkan kode mesin (misal: PMID-01)" className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mesin *</label>
                  <input type="text" placeholder="Masukkan nama mesin" className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi / Line</label>
                  <select className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled selected>Pilih Area / Line</option>
                    <option className="text-gray-900 bg-white">Line A</option>
                    <option className="text-gray-900 bg-white">Line B</option>
                  </select>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-orange-500 border-l-4 border-orange-500 pl-2">PARAMETER MQTT & OEE</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topik MQTT *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 border border-r-0 rounded-l-lg bg-gray-50">
                      <div className="w-5 h-5 relative">
                        <Image src="/MQTT.png" alt="MQTT" fill className="object-contain" />
                      </div>
                    </span>
                    <input type="text" placeholder="Masukkan topik mqtt" className="flex-1 border border-gray-300 rounded-r-lg p-2 text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Speed (Kinerja Maksimal)</label>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="0" className="w-28 border border-gray-300 p-2 rounded-lg font-bold text-right text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="text-sm text-gray-500">Pcs / Menit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t pt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
                Batal
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}