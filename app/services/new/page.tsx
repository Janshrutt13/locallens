"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  location: z.string().min(2),
  tags: z.string(),
});

export default function NewServicePage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("token");
    const res = await fetch("app/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, tags: data.tags.split(",") }),
    });

    if (res.ok) router.push("/services");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Create New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input placeholder="Title" {...register("title")} className="border p-2" />
        <textarea placeholder="Description" {...register("description")} className="border p-2" />
        <input placeholder="Category" {...register("category")} className="border p-2" />
        <input placeholder="Location" {...register("location")} className="border p-2" />
        <input placeholder="Tags (comma-separated)" {...register("tags")} className="border p-2" />
        <button className="bg-blue-600 text-white p-2 rounded" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Posting..." : "Post Service"}
        </button>
      </form>
    </div>
  );
}
