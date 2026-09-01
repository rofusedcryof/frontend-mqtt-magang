"use client";
import React, { useState } from 'react';
import { Edit, Trash, Plus, X } from 'lucide-react';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([
    { id: 1, machine: 'FILTER 1', product: 'R-NP-777200-1', qty: '2,000', priority: '1' },
    { id: 2, machine: 'FILTER 2', product: 'R-NP-777200-2', qty: '1,500', priority: '2' },
    { id: 3, machine: 'FILTER 1', product: 'R-NP-777200-3', qty: '3,000', priority: '3' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Step untuk form
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [machine, setMachine] = useState('');
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [priority, setPriority] = useState('');

  // Fungsi untuk membuka Edit dan mengisi data lama
  const handleOpenEdit = (item: typeof schedules[0]) => {
    setCurrentId(item.id);
    setMachine(item.machine);
    setProduct(item.product);
    setQty(item.qty);
    setPriority(item.priority);
    setIsEditModalOpen(true);
  };

  // Fungsi untuk membuka Add dan mengosongkan form
  const handleOpenAdd = () => {
    setMachine('');
    setProduct('');
    setQty('');
    setPriority('');
    setIsAddModalOpen(true);
  };

  // Fungsi Tambah Data
  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newSchedule = {
      id: Date.now(),
      machine: machine || 'FILTER 1',
      product,
      qty,
      priority,
    };
    setSchedules([...schedules, newSchedule]);
    setIsAddModalOpen(false);
  };

  // Fungsi Simpan Edit Data
  const handleEditSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedules(
      schedules.map((item) =>
        item.id === currentId
          ? { ...item, machine, product, qty, priority }
          : item
      )
    );
    setIsEditModalOpen(false);
  };

  // Fungsi Hapus Data
  const handleDelete = (id: number) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  // Fungsi Export PDF (Tabel & menyesuaikan Ukuran Kertas)
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="p-6 relative">
      {/* styling posisi tabel otomatis di tengah halaman */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 15mm;
          }
          body, html {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          body * {
            visibility: hidden;
          }
          #printable-table, #printable-table * {
            visibility: visible;
          }
          #printable-table {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 90% !important;
            max-width: 1000px !important;
            border: 1px solid #e5e7eb !important;
            box-shadow: none !important;
            border-radius: 8px !important;
            background: white !important;
          }
          #printable-table table {
            width: 100% !important;
            font-size: 15px !important;
          }
          #printable-table th, #printable-table td {
            padding: 14px 18px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* hidden saat dicetak */}
      <div className="no-print">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Production Schedule</h2>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handleOpenAdd}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Production Schedule
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg bg-white shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50">Settings</button>
            <button 
              onClick={handleExportPDF}
              className="px-4 py-2 border rounded-lg bg-white shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Bagian tabel yang akan diekspor/dicetak ke PDF */}
      <div id="printable-table" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 hidden print:block font-bold text-xl text-gray-900 border-b border-gray-100">
          Laporan Production Schedule
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
            <tr>
              <th className="px-4 py-3 w-24 no-print">Actions</th>
              <th className="px-4 py-3">Machine</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schedules.length > 0 ? (
              schedules.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex gap-2 no-print">
                    <button 
                      onClick={() => handleOpenEdit(item)} 
                      className="text-blue-500 hover:bg-blue-50 p-1 rounded transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="text-red-500 hover:bg-red-50 p-1 rounded transition"
                      title="Hapus"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-medium">{item.machine}</td>
                  <td className="px-4 py-3 text-gray-900">{item.product}</td>
                  <td className="px-4 py-3 text-gray-900">{item.qty}</td>
                  <td className="px-4 py-3 text-gray-900">{item.priority}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">Tidak ada data schedule.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD PRODUCTION SCHEDULE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Production Schedule</h3>
            
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Machine</label>
                <select 
                  value={machine}
                  onChange={(e) => setMachine(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium"
                >
                  <option value="" disabled>Pilih Machine</option>
                  <option value="FILTER 1" className="text-gray-900 bg-white">FILTER 1</option>
                  <option value="FILTER 2" className="text-gray-900 bg-white">FILTER 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <input 
                  type="text" 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Masukkan nama product"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                <input 
                  type="number" 
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Masukkan qty"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input 
                  type="number" 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="Masukkan priority"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*EDIT SCHEDULE */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl relative">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Production Schedule</h3>
            
            <form onSubmit={handleEditSchedule} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Machine</label>
                <select 
                  value={machine}
                  onChange={(e) => setMachine(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium"
                >
                  <option value="" disabled>Pilih Machine</option>
                  <option value="FILTER 1" className="text-gray-900 bg-white">FILTER 1</option>
                  <option value="FILTER 2" className="text-gray-900 bg-white">FILTER 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <input 
                  type="text" 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Masukkan nama product"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                <input 
                  type="text" 
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Masukkan qty"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input 
                  type="text" 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  placeholder="Masukkan priority"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}