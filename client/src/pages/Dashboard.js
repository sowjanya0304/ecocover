import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(res.data);
        const r = await axios.get('http://localhost:5000/api/reports');
        setReports(r.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700">Dashboard</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Reports: {stats?.totalReports}</div>
        <div className="bg-white p-4 rounded shadow">Completed Pickups: {stats?.totalPickups}</div>
        <div className="bg-white p-4 rounded shadow">Points Distributed: {stats?.pointsDistributed}</div>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Recent Reports</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {reports.map(r => (
          <div key={r._id} className="bg-white p-3 rounded shadow">
            <img src={`http://localhost:5000${r.imageUrl}`} alt="report" className="w-full h-40 object-cover" />
            <div className="mt-2">Type: {r.detectedType}</div>
            <div>Status: {r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
