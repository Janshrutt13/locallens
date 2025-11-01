"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/me").then(async (r) => {
      if (r.ok) setUser(await r.json());
    });
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome to LocalLens 👋</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        Hi {user?.name || "there"}, explore local services near you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* placeholder cards for now */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-white shadow rounded">
            <h2 className="font-semibold">Service #{i}</h2>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
