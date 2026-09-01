"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

export default function MasterMachinePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('Aktif');
  
  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // State untuk form registrasi mesin baru beserta error validasinya
  const [formKode, setFormKode] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formArea, setFormArea] = useState('');
  const [formMqtt, setFormMqtt] = useState('');
  const [formTarget, setFormTarget] = useState('');
  
  // State tambahan untuk parameter MQTT & OEE baru
  const [formGross, setFormGross] = useState('');
  const [formRunningHours, setFormRunningHours] = useState('');
  const [formRunningMinutes, setFormRunningMinutes] = useState('');
  const [formIdleHours, setFormIdleHours] = useState('');
  const [formIdleMinutes, setFormIdleMinutes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [dataMesin, setDataMesin] = useState([
    { 
      no: 1, 
      kode: 'MC-FBF-01', 
      nama: 'FILTER 1', 
      area: 'Line A', 
      target: '2,500', 
      gross: '12,500', 
      runningHours: '5', 
      runningMinutes: '30', 
      idleHours: '1', 
      idleMinutes: '15', 
      status: 'Aktif' 
    },
    { 
      no: 2, 
      kode: 'MC-CMF-01', 
      nama: 'CMF 1', 
      area: 'Line B', 
      target: '1,800', 
      gross: '9,000', 
      runningHours: '4', 
      runningMinutes: '0', 
      idleHours: '2', 
      idleMinutes: '30', 
      status: 'Nonaktif' 
    },
  ]);

  // Fungsi untuk membuka modal ubah status saat icon edit/pensil diklik
  const handleOpenStatusModal = (item: any) => {
    setSelectedMachine(item);
    setNewStatus(item.status);
    setIsStatusModalOpen(true);
  };

  // Fungsi untuk menyimpan perubahan status dari modal
  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMachine) {
      setDataMesin(
        dataMesin.map((item) =>
          item.no === selectedMachine.no ? { ...item, status: newStatus } : item
        )
      );
    }
    setIsStatusModalOpen(false);
  };

  // Fungsi untuk menghapus data mesin
  const handleDeleteMachine = (no: number) => {
    setDataMesin(dataMesin.filter((item) => item.no !== no));
  };

  // Fungsi untuk handle submit form registrasi dengan validasi wajib isi
  const handleSaveNewMachine = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formKode.trim()) newErrors.kode = 'Kode mesin wajib diisi!';
    if (!formNama.trim()) newErrors.nama = 'Nama mesin wajib diisi!';
    if (!formArea) newErrors.area = 'Area / Line wajib dipilih!';
    if (!formMqtt.trim()) newErrors.mqtt = 'Topik MQTT wajib diisi!';
    if (!formTarget.trim()) newErrors.target = 'Target speed wajib diisi!';
    if (!formGross.trim()) newErrors.gross = 'Data Gross wajib diisi!';
    if (!formRunningHours.trim()) newErrors.runningHours = 'Total running hours wajib diisi!';
    if (!formRunningMinutes.trim()) newErrors.runningMinutes = 'Total running minutes wajib diisi!';
    if (!formIdleHours.trim()) newErrors.idleHours = 'Total idle hours wajib diisi!';
    if (!formIdleMinutes.trim()) newErrors.idleMinutes = 'Total idle minutes wajib diisi!';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Jika validasi lolos, tambahkan data baru ke tabel
    const newMachine = {
      no: dataMesin.length > 0 ? Math.max(...dataMesin.map(m => m.no)) + 1 : 1,
      kode: formKode,
      nama: formNama,
      area: formArea,
      target: Number(formTarget).toLocaleString('en-US'),
      gross: Number(formGross).toLocaleString('en-US'),
      runningHours: formRunningHours,
      runningMinutes: formRunningMinutes,
      idleHours: formIdleHours,
      idleMinutes: formIdleMinutes,
      status: 'Aktif',
    };

    setDataMesin([...dataMesin, newMachine]);
    
    // Reset form dan tutup modal
    setFormKode('');
    setFormNama('');
    setFormArea('');
    setFormMqtt('');
    setFormTarget('');
    setFormGross('');
    setFormRunningHours('');
    setFormRunningMinutes('');
    setFormIdleHours('');
    setFormIdleMinutes('');
    setErrors({});
    setIsModalOpen(false);
  };

  // Filter data mesin berdasarkan nama atau kode mesin (case-insensitive)
  const filteredData = dataMesin.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <input 
              type="text" 
              placeholder="Cari nama atau kode mesin..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 bg-white" 
            />
          </div>
        </div>
        <button onClick={() => { setIsModalOpen(true); setErrors({}); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Tambah Mesin Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Kode Mesin</th>
              <th className="px-4 py-3">Nama Mesin</th>
              <th className="px-4 py-3">Area / Line</th>
              <th className="px-4 py-3 text-right">Target (Unit/Jam)</th>
              <th className="px-4 py-3 text-right">Data Gross</th>
              <th className="px-4 py-3 text-center">Running Time</th>
              <th className="px-4 py-3 text-center">Idle Time</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.kode}</td>
                  <td className="px-4 py-3 text-blue-600 font-medium">{item.nama}</td>
                  <td className="px-4 py-3 text-gray-900">{item.area}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{item.target}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{item.gross}</td>
                  <td className="px-4 py-3 text-center text-gray-900">{item.runningHours} Jam {item.runningMinutes} Min</td>
                  <td className="px-4 py-3 text-center text-gray-900">{item.idleHours} Jam {item.idleMinutes} Min</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button 
                      onClick={() => handleOpenStatusModal(item)} 
                      className="text-blue-500 hover:bg-blue-50 p-1 rounded transition" 
                      title="Ubah Status Mesin"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMachine(item.no)} 
                      className="text-red-500 hover:bg-red-50 p-1 rounded transition" 
                      title="Hapus Mesin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  Data mesin tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL UBAH STATUS MESIN (AKTIF / NONAKTIF) */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl relative">
            <button onClick={() => setIsStatusModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ubah Status Mesin</h3>
            <p className="text-sm text-gray-500 mb-4">Mesin: <span className="font-semibold text-gray-800">{selectedMachine?.nama}</span></p>
            
            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Status Mesin</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Aktif" className="text-gray-900 bg-white">Aktif (Dihidupkan)</option>
                  <option value="Nonaktif" className="text-gray-900 bg-white">Nonaktif (Dimatikan)</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsStatusModalOpen(false)} 
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 text-sm transition"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REGISTRASI MESIN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Form Registrasi Mesin Produksi</h3>
            
            <form onSubmit={handleSaveNewMachine}>
              <div className="grid grid-cols-2 gap-8">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-blue-700 border-l-4 border-blue-600 pl-2">IDENTITAS MESIN</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mesin *</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan kode mesin (misal: PMID-01)" 
                      value={formKode}
                      onChange={(e) => setFormKode(e.target.value)}
                      className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.kode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    />
                    {errors.kode && <p className="text-xs text-red-500 mt-1">{errors.kode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mesin *</label>
                    <input 
                      type="text" 
                      placeholder="Masukkan nama mesin" 
                      value={formNama}
                      onChange={(e) => setFormNama(e.target.value)}
                      className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.nama ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    />
                    {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi / Line *</label>
                    <select 
                      value={formArea}
                      onChange={(e) => setFormArea(e.target.value)}
                      className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.area ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                    >
                      <option value="" disabled>Pilih Area / Line</option>
                      <option className="text-gray-900 bg-white" value="Line A">Line A</option>
                      <option className="text-gray-900 bg-white" value="Line B">Line B</option>
                    </select>
                    {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-orange-500 border-l-4 border-orange-500 pl-2">PARAMETER MQTT & OEE</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Topik MQTT *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 border border-r-0 rounded-l-lg bg-gray-50 border-gray-300">
                        <div className="w-5 h-5 relative">
                          <Image src="/MQTT.png" alt="MQTT" fill className="object-contain" />
                        </div>
                      </span>
                      <input 
                        type="text" 
                        placeholder="Masukkan topik mqtt" 
                        value={formMqtt}
                        onChange={(e) => setFormMqtt(e.target.value)}
                        className={`flex-1 border p-2 rounded-r-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.mqtt ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                      />
                    </div>
                    {errors.mqtt && <p className="text-xs text-red-500 mt-1">{errors.mqtt}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Speed (Kinerja Maksimal) *</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={formTarget}
                        onChange={(e) => setFormTarget(e.target.value)}
                        className={`w-32 border p-2 rounded-lg font-bold text-right text-gray-900 bg-white focus:outline-none focus:ring-2 ${errors.target ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                      />
                      <span className="text-sm text-gray-500">Pcs / Menit</span>
                    </div>
                    {errors.target && <p className="text-xs text-red-500 mt-1">{errors.target}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Gross *</label>
                    <input 
                      type="number" 
                      placeholder="Masukkan data gross" 
                      value={formGross}
                      onChange={(e) => setFormGross(e.target.value)}
                      className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.gross ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                    />
                    {errors.gross && <p className="text-xs text-red-500 mt-1">{errors.gross}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Running Hours *</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={formRunningHours}
                        onChange={(e) => setFormRunningHours(e.target.value)}
                        className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.runningHours ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                      />
                      {errors.runningHours && <p className="text-xs text-red-500 mt-1">{errors.runningHours}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Running Minutes *</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={formRunningMinutes}
                        onChange={(e) => setFormRunningMinutes(e.target.value)}
                        className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.runningMinutes ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                      />
                      {errors.runningMinutes && <p className="text-xs text-red-500 mt-1">{errors.runningMinutes}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Idle Hours *</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={formIdleHours}
                        onChange={(e) => setFormIdleHours(e.target.value)}
                        className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.idleHours ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                      />
                      {errors.idleHours && <p className="text-xs text-red-500 mt-1">{errors.idleHours}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Idle Minutes *</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={formIdleMinutes}
                        onChange={(e) => setFormIdleMinutes(e.target.value)}
                        className={`w-full border p-2 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 ${errors.idleMinutes ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} 
                      />
                      {errors.idleMinutes && <p className="text-xs text-red-500 mt-1">{errors.idleMinutes}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
                  Batal
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}