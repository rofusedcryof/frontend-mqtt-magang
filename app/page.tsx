// "use client";

// import mqtt from 'mqtt';
// import { useEffect, useState } from 'react';
// import type { ReactNode } from 'react';

// export default function Dashboard() {
//   const [suhuRealtime, setSuhuRealtime] = useState(0);
//   const [statusMesin, setStatusMesin] = useState('Menghubungkan...');
//   const [riwayatSuhu, setRiwayatSuhu] = useState([]);

//   // 1. Fungsi Menarik Data Riwayat dari Laravel (Database MySQL)
//   const fetchRiwayatDariLaravel = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/sensor/latest');
//       const json = await response.json();
      
//       if (json.success) {
//         setRiwayatSuhu(json.data);
//       }
//     } catch (error) {
//       console.error("Gagal terhubung ke API Laravel:", error);
//     }
//   };

//   // 2. Jalankan Fetch API saat halaman pertama kali dibuka
//   useEffect(() => {
//     fetchRiwayatDariLaravel();
//   }, []);

//   // 3. Jalankan MQTT untuk Real-time
//   useEffect(() => {
//     const brokerUrl = 'ws://127.0.0.1:9001'; 
//     const client = mqtt.connect(brokerUrl);

//     client.on('connect', () => {
//       setStatusMesin('RUNNING');
//       client.subscribe('sensor/suhu');
//     });

//     client.on('message', (topic, message) => {
//       if (topic === 'sensor/suhu') {
//         try {
//           const payload = JSON.parse(message.toString());
//           if (payload.suhu) {
//             setSuhuRealtime(payload.suhu);
//             // Opsional: Refresh riwayat tabel setiap kali ada data baru masuk
//             // fetchRiwayatDariLaravel(); 
//           }
//         } catch (error) {
//           console.error("Format MQTT salah:", error);
//         }
//       }
//     });

//     return () => {
//       if (client) client.end();
//     };
//   }, []);

//   return (
//     <div style={{ fontFamily: 'sans-serif', backgroundColor: '#eef2f5', minHeight: '100vh', color: '#333' }}>
      
//       {/* Header */}
//       <header style={{ backgroundColor: '#0f172a', color: 'white', padding: '1.2rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard Full-Stack IoT</h1>
//           <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Next.js (Frontend) & Laravel (Backend API)</span>
//         </div>
//         <div>
//           <span style={{ background: '#334155', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9rem' }}>Live Server Aktif</span>
//         </div>
//       </header>

//       {/* Konten Dashboard */}
//       <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
//         {/* Baris Atas: Panel Real-time */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          
//           <div style={{ background: 'white', borderRadius: '10px', padding: '1.5rem', borderTop: '4px solid #10b981', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
//             <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#475569', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Status Broker MQTT</h2>
//             <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '50px', backgroundColor: statusMesin === 'RUNNING' ? '#d1fae5' : '#fee2e2', color: statusMesin === 'RUNNING' ? '#065f46' : '#991b1b', fontWeight: 'bold' }}>
//               {statusMesin}
//             </div>
//           </div>

//           <div style={{ background: 'white', borderRadius: '10px', padding: '1.5rem', borderTop: '4px solid #3b82f6', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
//             <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#475569', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Suhu Mesin (Real-time MQTT)</h2>
//             <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#1e293b' }}>
//               {suhuRealtime} <span style={{ fontSize: '1rem', color: '#64748b' }}>°C</span>
//             </div>
//           </div>

//         </div>

//         {/* Baris Bawah: Panel Database (Dari Laravel) */}
//         <div style={{ background: 'white', borderRadius: '10px', padding: '1.5rem', borderTop: '4px solid #6366f1', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
//           <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#475569', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Riwayat Suhu Terakhir (Dari Database MySQL via Laravel API)</h2>
          
//           <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', textAlign: 'left' }}>
//             <thead>
//               <tr style={{ backgroundColor: '#f8fafc', color: '#475569' }}>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Waktu Tersimpan</th>
//                 <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Suhu Tercatat</th>
//               </tr>
//             </thead>
//             <tbody>
//               {riwayatSuhu.length > 0 ? (
//                 riwayatSuhu.map((dataLog: any, index: number) => (
//                   <tr key={index}>
//                     <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
//                       {new Date(dataLog.created_at).toLocaleString('id-ID')}
//                     </td>
//                     <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', color: '#1e293b' }}>
//                       {dataLog.suhu} °C
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={2} style={{ padding: '12px', textAlign: 'center', color: '#94a3b8' }}>
//                     Belum ada data dari API atau pastikan Laravel Server (port 8000) menyala.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }