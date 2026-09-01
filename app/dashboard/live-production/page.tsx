"use client";

import React, { useEffect, useState } from "react";

export default function LiveProductionPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard"
        );

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        const result = await response.json();

        console.log("DATA DARI LARAVEL:", result);

        if (result.success) {
          setDashboard(result.data);
        } else {
          setError(result.message || "Data tidak ditemukan");
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Gagal terhubung ke Laravel");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Mengambil data dari Laravel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const mesin = dashboard?.mesin;
  const produksi = dashboard?.produksi;
  const downtime = dashboard?.downtime;
  const jadwal = dashboard?.jadwal ?? [];

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-bold text-gray-800">
          Live Performance Line A
        </h2>
      </div>

      {/* TABLE PRODUCTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="p-4 border-b border-gray-200 flex justify-between">
          <h3 className="font-bold text-gray-700">
            Production Performance
          </h3>

          <div className="flex gap-4 text-sm font-medium">
            <span className="text-gray-500">
              MACHINE:
              <span className="text-gray-800 ml-1">
                {mesin?.nama_mesin ?? "-"}
              </span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Machine</th>
                <th className="px-4 py-3">Jumlah Produksi</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Waste</th>
                <th className="px-4 py-3">Down Time</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

              {mesin && produksi ? (
                <tr className="hover:bg-gray-50">

                  <td className="px-4 py-3 font-medium text-gray-600">
                    1
                  </td>

                  <td className="px-4 py-3 font-medium text-blue-600">
                    {mesin.nama_mesin}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-600">
                    {produksi.gross_production.toLocaleString("id-ID")}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-600">
                    {Number(produksi?.target_qty ?? 0).toLocaleString("id-ID")}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-600">
                    {produksi.waste.toLocaleString("id-ID")}
                  </td>

                  <td className="px-4 py-3 text-red-500 font-medium">
                    {downtime.total} menit
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full font-bold text-xs ${
                        mesin.status === "RUNNING"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {mesin.status}
                    </span>

                  </td>

                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Belum ada data produksi.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>


      {/* DOWNTIME */}
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
        Detail Down Time
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Planned */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-gray-50 p-3 font-bold text-gray-700 border-b">
            Planned Down Time
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500">
              Total Planned
            </p>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {downtime?.planned ?? 0}
              <span className="text-sm font-normal ml-1">
                menit
              </span>
            </p>
          </div>

        </div>


        {/* Unplanned */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-gray-50 p-3 font-bold text-gray-700 border-b">
            Unplanned Down Time
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500">
              Total Unplanned
            </p>

            <p className="text-3xl font-bold text-red-500 mt-2">
              {downtime?.unplanned ?? 0}
              <span className="text-sm font-normal ml-1">
                menit
              </span>
            </p>
          </div>

        </div>


        {/* Total */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="bg-gray-50 p-3 font-bold text-gray-700 border-b">
            Total Down Time
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {downtime?.total ?? 0}
              <span className="text-sm font-normal ml-1">
                menit
              </span>
            </p>
          </div>

        </div>

      </div>


      {/* PRODUCTION SCHEDULE */}
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
        Production Schedule
      </h3>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">

              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Prioritas</th>
                <th className="px-4 py-3">Kode Produk</th>
                <th className="px-4 py-3">Target Qty</th>
                <th className="px-4 py-3">Status</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200">

              {jadwal.length > 0 ? (
                jadwal.map((item: any, index: number) => (

                  <tr
                    key={item.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3">
                      {item.prioritas}
                    </td>

                    <td className="px-4 py-3 font-medium text-blue-600">
                      {item.kode_produk}
                    </td>

                    <td className="px-4 py-3">
                      {item.target_qty.toLocaleString("id-ID")}
                    </td>

                    <td className="px-4 py-3">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                        {item.status}
                      </span>

                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Belum ada jadwal produksi.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}