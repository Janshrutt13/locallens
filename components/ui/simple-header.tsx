'use client';

import React from 'react'; 
import { Grid2x2PlusIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check if user is authenticated by trying to fetch user data
		fetch('/api/me')
			.then(res => setIsAuthenticated(res.ok))
			.catch(() => setIsAuthenticated(false));
	}, []);

	const handleLogout = async () => {
		await fetch('/api/auth/logout', { method: 'POST' });
		setIsAuthenticated(false);
		router.push('/signin');
	};

	const links = [
		{
			label: 'Home',
			href: '/home',
		},
		{
			label: 'Discover',
			href: '/discover',
		},
		{
			label: 'About',
			href: '/about',
		},
	];

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
			<nav className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
				<div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/home')}>
					<Grid2x2PlusIcon className="size-6" />
					<p className="font-mono text-lg font-bold">LocalLens</p>
				</div>
				<div className="hidden items-center gap-2 lg:flex">
					{links.map((link) => (
						<button
							key={link.label}
							className={buttonVariants({ variant: 'ghost' })}
							onClick={() => router.push(link.href)}
						>
							{link.label}
						</button>
					))}
					{isAuthenticated ? (
						<Button variant="destructive" onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<>
							<Button variant="outline" onClick={() => router.push('/signin')}>
								Sign In
							</Button>
							<Button onClick={() => router.push('/signup')}>
								Sign Up
							</Button>
						</>
					)}
				</div>
				<Sheet open={open} onOpenChange={setOpen}>
					<Button size="icon" variant="outline" className="lg:hidden">
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-6"
						/>
					</Button>
					<SheetContent
						className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
						showClose={false}
						side="left"
					>
						<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
							{links.map((link) => (
								<button
									key={link.label}
									className={buttonVariants({
										variant: 'ghost',
										className: 'justify-start',
									})}
									onClick={() => {
										router.push(link.href);
										setOpen(false);
									}}
								>
									{link.label}
								</button>
							))}
						</div>
						<SheetFooter>
							{isAuthenticated ? (
								<Button variant="destructive" onClick={handleLogout}>
									Logout
								</Button>
							) : (
								<>
									<Button variant="outline" onClick={() => router.push('/signin')}>
										Sign In
									</Button>
									<Button onClick={() => router.push('/signup')}>
										Sign Up
									</Button>
								</>
							)}
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}