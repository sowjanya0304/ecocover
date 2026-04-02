import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-green-700">EcoTrack</h1>
        <p className="mt-4 text-gray-600">Smart Waste Management System</p>
        <div className="mt-6">
          <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded mr-2">Sign Up</Link>
          <Link to="/login" className="bg-gray-200 px-4 py-2 rounded">Login</Link>
        </div>
      </div>
    </div>
  );
}
