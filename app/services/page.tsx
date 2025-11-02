"use client";
import { useEffect, useState } from "react";

export default function ServicesPage(){
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("/api/services")
        .then(( res) => res.json())
        .then(setServices)
    } , []);

    return(
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 ">Availabe Services</h2>
            <div className="grid gap-4">
               {services.map((s : any) => (
                 <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p>
                        {s.description}
                    </p>
                    <p className="text-sm text-gray-500">{s.location}</p>
                    <p className="text-sm mt-1">{s.user.name}</p>
                    <p className="text-xs text-gray-400 mt-1">Tags : {s.tags.join(",")}</p>
                 </div>
               ))}
            </div>
        </div>
    )
}