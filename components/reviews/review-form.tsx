"use client"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export function ReviewForm({ serviceId, token }: { serviceId: string; token: string }) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () =>
      axios.post(
        "/api/reviews",
        { serviceId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews", serviceId] })
      setComment("")
      setRating(5)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate()
      }}
      className="space-y-3 p-4 bg-white rounded-lg shadow"
    >
      <label className="block font-semibold">Rating (1–5)</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 rounded w-full"
      />

      <label className="block font-semibold">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  )
}
