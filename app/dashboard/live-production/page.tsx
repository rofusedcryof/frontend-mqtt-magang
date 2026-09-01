import React from 'react';

export default function LiveProductionPage() {
  const data = [
    { no: 1, machine: 'FILTER 1', jumlah: '5,653', wp: '5,037', wf: '5,037', idle: '38,810', comm: '13,853', down: '6h 53m', status: 'RUN' },
    { no: 2, machine: 'FILTER 2', jumlah: '13,114', wp: '3,784', wf: '3,783', idle: '52,405', comm: '6,475', down: '1h 12m', status: 'RUN' },
    { no: 3, machine: 'FILTER 3', jumlah: '9,420', wp: '2,105', wf: '1,980', idle: '41,200', comm: '10,240', down: '3h 45m', status: 'RUN' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-gray-800">Live Performance Line A</h2>
      </div>

      {/* Table Production */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between">
          <h3 className="font-bold text-gray-700">Performa Mahardika Indonesia, PT</h3>
          <div className="flex gap-4 text-sm font-medium">
            <span className="text-gray-500">PRODUCTION DATE: <span className="text-gray-800">Thursday, 09-Feb-2023</span></span>
            <span className="text-gray-500">SHIFT: <span className="text-gray-800">1</span></span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 ">No</th>
                <th className="px-4 py-3">Machine</th>
                <th className="px-4 py-3">Jumlah Produksi</th>
                <th className="px-4 py-3">Waste Paper</th>
                <th className="px-4 py-3">Waste Filter</th>
                <th className="px-4 py-3">Idle Hours</th>
                <th className="px-4 py-3">Commercial Hours</th>
                <th className="px-4 py-3">Down Time</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr key={row.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-600">{row.no}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{row.machine}</td>
                  <td className="px-4 py-3 font-medium text-gray-600">{row.jumlah}</td>
                  <td className="px-4 py-3 font-medium text-gray-600">{row.wp}</td>
                  <td className="px-4 py-3 font-medium text-gray-600">{row.wf}</td>
                  <td className="px-4 py-3 font-medium text-gray-600">{row.idle}</td>
                  <td className="px-4 py-3 font-medium text-gray-600">{row.comm}</td>
                  <td className="px-4 py-3 text-red-500 font-medium">{row.down}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Down Time Section */}
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Detail Down Time MC01</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 font-bold text-gray-700 border-b">Unplanned Down Time</div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr><th className="p-3">Code</th><th className="p-3">Description</th><th className="p-3">Duration</th></tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3 font-medium text-gray-600">U-01</td><td className="p-3 font-medium text-gray-600">Mechanical</td><td className="p-3 font-medium text-gray-600">1h 20m</td></tr>
              <tr><td className="p-3 font-medium text-gray-600">U-02</td><td className="p-3 font-medium text-gray-600">Electrical</td><td className="p-3 font-medium text-gray-600">0h 45m</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 p-3 font-bold text-gray-700 border-b">Planned Down Time</div>
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr><th className="p-3">Code</th><th className="p-3">Description</th><th className="p-3">Duration</th></tr>
            </thead>
            <tbody className="divide-y">
              <tr><td className="p-3 font-medium text-gray-600">P-01</td><td className="p-3 font-medium text-gray-600">Trial</td><td className="p-3 font-medium text-gray-600">4h 00m</td></tr>
              <tr><td className="p-3 font-medium text-gray-600">P-02</td><td className="p-3 font-medium text-gray-600">No Order</td><td className="p-3 font-medium text-gray-600">8h 00m</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}