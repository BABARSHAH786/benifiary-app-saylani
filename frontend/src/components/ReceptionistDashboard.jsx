import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceptionistDashboard = () => {
  const [stats, setStats] = useState({
    beneficiariesToday: 0,
    tokensIssued: 0,
    pendingTokens: 0,
    completedTokens: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/receptionist/stats/today"); // Update if needed
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please login first");
    window.location.href = "/reception/login";
  }
}, []);


  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 shadow">
        <h1 className="text-xl font-semibold">Receptionist Dashboard</h1>
      </nav>

      {/* Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-6">Today's Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Beneficiaries Today" value={stats.beneficiariesToday} />
          <Card title="Tokens Issued" value={stats.tokensIssued} />
          <Card title="Pending Tokens" value={stats.pendingTokens} />
          <Card title="Completed Tokens" value={stats.completedTokens} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4">
        &copy; {new Date().getFullYear()} Saylani Welfare | Receptionist Panel
      </footer>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

export default ReceptionistDashboard;
