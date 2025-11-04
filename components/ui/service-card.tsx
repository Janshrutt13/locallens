import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, PlusIcon } from 'lucide-react';

type ServiceInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon;
	label: string;
	value: string;
};

type ServiceCardProps = React.ComponentProps<'div'> & {
	title?: string;
	description?: string;
	serviceDetails?: ServiceInfoProps[];
	formSectionClassName?: string;
};

export function ServiceCard({
	title = 'Post Your Local Service',
	description = 'Create a listing for the service you offer — whether you\'re a tutor, pet walker, home chef, or freelancer nearby. Help locals find and contact you easily.',
	serviceDetails,
	className,
	formSectionClassName,
	children,
	...props
}: ServiceCardProps) {
	return (
		<div
			className={cn(
				'bg-card border relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
				className,
			)}
			{...props}
		>
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6" />

			<div className="flex flex-col justify-between lg:col-span-2">
				<div className="relative h-full space-y-4 px-4 py-8 md:p-8">
					<h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
						{title}
					</h1>
					<p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
						{description}
					</p>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{serviceDetails?.map((detail, index) => (
							<ServiceInfo key={index} {...detail} />
						))}
					</div>
				</div>
			</div>

			<div
				className={cn(
					'bg-muted/40 flex h-full w-full items-center border-t p-5 md:col-span-1 md:border-t-0 md:border-l',
					formSectionClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

function ServiceInfo({
	icon: Icon,
	label,
	value,
	className,
	...props
}: ServiceInfoProps) {
	return (
		<div className={cn('flex items-center gap-3 py-3', className)} {...props}>
			<div className="bg-muted/40 rounded-lg p-3">
				<Icon className="h-5 w-5" />
			</div>
			<div>
				<p className="font-medium">{label}</p>
				<p className="text-muted-foreground text-xs">{value}</p>
			</div>
		</div>
	);
}