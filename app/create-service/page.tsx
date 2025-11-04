"use client";

import { ServiceCard } from "@/components/ui/service-card";
import { MapPinIcon, UserIcon, BriefcaseIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SimpleHeader } from "@/components/ui/simple-header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateServicePage() {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!title || !category || !description || !location) {
			setError("Please fill in all fields");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const res = await fetch("/api/services", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					description: `${description} | Category: ${category} | Location: ${location}`,
					tags: category
				}),
			});

			if (res.ok) {
				router.push("/home");
			} else {
				const data = await res.json();
				setError(data.error || "Failed to create service");
			}
		} catch {
			setError("Failed to create service");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black">
			<SimpleHeader />
			<main className="relative flex min-h-screen w-full items-center justify-center p-4">
				<div className="mx-auto max-w-5xl">
					<ServiceCard
						title="Create a New Service"
						description="Add your service details below to reach people nearby. The more info you provide, the easier clients can find and trust your listing."
						serviceDetails={[
							{
								icon: UserIcon,
								label: 'Your Profile',
								value: 'Ready to post your service',
							},
							{
								icon: BriefcaseIcon,
								label: 'Service Type',
								value: 'Tutoring, Cooking, Cleaning, etc.',
							},
							{
								icon: MapPinIcon,
								label: 'Location',
								value: 'Help locals find you nearby',
								className: 'col-span-2',
							},
						]}
					>
						<form className="w-full space-y-4" onSubmit={handleSubmit}>
							<div className="flex flex-col gap-2">
								<Label>Service Title</Label>
								<Input 
									type="text" 
									placeholder="e.g. Home Tutoring for Class 10"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Category</Label>
								<Input 
									type="text" 
									placeholder="e.g. Education, Home Services"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Description</Label>
								<Textarea 
									placeholder="Describe your service, rates, and any special details..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<Label>Location</Label>
								<Input 
									type="text" 
									placeholder="e.g. Connaught Place, Delhi"
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								/>
							</div>

							{error && (
								<div className="text-sm text-red-500 text-center">{error}</div>
							)}

							<Button 
								className="w-full" 
								type="submit"
								disabled={loading}
							>
								{loading ? "Publishing..." : "Publish Service"}
							</Button>
						</form>
					</ServiceCard>
				</div>
			</main>
		</div>
	);
}