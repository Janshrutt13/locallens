"use client";
import { SimpleHeader } from "@/components/ui/simple-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();


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
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome to LocalLens 👋</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/services")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Browse Services
            </button>
            <button
              onClick={() => router.push("/services/new")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Post a Service
            </button>
          </div>
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
    </div>
  );
}
