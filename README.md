🚀 LocalLens — Community Services Marketplace

A modern service-sharing platform with real-time messaging, reviews, and geo-based service discovery.

LocalLens is a full-stack marketplace built with Next.js 14, Supabase, and Tailwind, allowing users to post services, discover services, chat with providers, and leave reviews — similar to Fiverr but for local communities.

✨ Features
🏠 Beautiful Home Page

Custom hero section with smooth animations

Fully responsive, peach-themed UI

Clean typography with accessible contrast

📌 Service Management

Create new services with images, location, and categories

Browse all available services

View detailed service information (Fiverr-style layout)

Tags, rating preview, seller details, and more

⭐ Review System

Users can submit ratings & reviews for services

Reviews appear instantly (live sync via Supabase)

Average ratings auto-calculated

💬 Real-Time Messaging

One-to-one chat system (serverless, using Supabase channels)

Instant updates without page refresh

Shows message history per conversation

👤 User Profiles

Service owner profile preview on service page

Ability to contact the service provider directly

Basic identity and email verification via Supabase Auth

📍 Location Support

Each service can optionally store geolocation coordinates

Used for future map-based discovery

🎨 UI & Component System

shadcn/ui integrated

Tailwind CSS for rapid styling

Custom components (Hero, MockupFrame, Buttons, Inputs, Feature sections)

Lucide icons for clarity

Responsive on all devices

🏗️ Tech Stack
Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

shadcn/ui component library

React Query for API caching

Lucide Icons

Backend

Supabase (Postgres + Auth + Storage + Realtime)

Supabase Channels for messaging

Prisma ORM

Deployment

Fully deployable on Vercel

Supabase handles all backend logic

Zero WebSocket servers required

📂 Folder Structure
app/
 ├─ (home)/           # Landing page with hero section
 ├─ services/
 │   ├─ page.tsx      # Browse services
 │   └─ [id]/
 │       └─ page.tsx  # Service detail (Fiverr-style)
 ├─ create/
 │   └─ page.tsx      # Create new service form
 └─ messages/
     └─ page.tsx      # Real-time chat UI

components/
 ├─ ui/               # shadcn + custom components
 ├─ blocks/           # Hero, Features, etc.
 └─ messaging/        # Chat bubbles, message list, input

lib/
 ├─ supabase.ts
 ├─ prisma.ts
 └─ utils.ts

🧪 Database Schema (Supabase)
services
column	type	description
id	uuid (pk)	service ID
title	text	service title
description	text	full details
tags	text[]	array of tags
owner_id	uuid	FK to users
latitude	float	optional
longitude	float	optional
created_at	timestamp	auto
reviews
column	type
id	uuid (pk)
service_id	uuid
author_id	uuid
rating	int
comment	text
created_at	timestamp
messages
column	type
id	uuid (pk)
sender_id	uuid
receiver_id	uuid
content	text
created_at	timestamp
🔧 Setup Instructions
1️⃣ Clone the Repo
git clone https://github.com/your-username/local-lens.git
cd local-lens

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment

Create .env.local:

NEXT_PUBLIC_SUPABASE_URL=xxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx

4️⃣ Setup shadcn/ui
npx shadcn-ui init

5️⃣ Run the Development Server
npm run dev


Your app is now running at http://localhost:3000

🚀 Deployment
Deploy to Vercel

Just run:

vercel


Vercel hosts your Next.js frontend

Supabase handles database + auth + realtime

Messaging works even on Vercel (serverless compatible)

🎯 Roadmap

 Add map view for services

 Add “save service” button

 User dashboard for posted / saved services

 Image optimization with Supabase Storage

 AI-powered service recommendations