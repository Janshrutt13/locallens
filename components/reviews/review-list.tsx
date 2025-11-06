"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function ReviewList({serviceId} : {serviceId : string}){
    const {data , isLoading} = useQuery({
        queryKey : ['reviews' , serviceId],
        queryFn : async() => (await axios.get(`/api/services/${serviceId}/revies`)).data
    })

    if(isLoading) return <p>Loading reviews...</p>
    if(!data?.length) return <p>No reviews yet.</p>

    return (
        <div className="space-y-4">
            {data.map((r : any) => (
                <div key = {r.id} className="border p-3 rounded-lg bg-white">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{r.user?.name || "Anon"}</p>
                        <p className="text-yellow-500">⭐ {r.rating}</p>
                    </div>
                    <p className="text-gray-700 mt-2">{r.comment}</p>
                </div>
            ))}
        </div>
    )
}