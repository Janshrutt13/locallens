import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
    try {
        const services = await prisma.service.findMany({
            include: { owner: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(services);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, description, tags, location } = await req.json();

        // For now, create a default user if none exists
        let defaultUser = await prisma.user.findFirst();
        if (!defaultUser) {
            defaultUser = await prisma.user.create({
                data: {
                    name: "Demo User",
                    email: "demo@locallens.com",
                    password: "demo"
                }
            });
        }

        const service = await prisma.service.create({
            data: {
                title,
                description: `${description} | Location: ${location || 'Not specified'}`,
                tags,
                ownerId: defaultUser.id
            }
        });

        return NextResponse.json(service);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}