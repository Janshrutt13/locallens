import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.chatMessage.findMany({
      orderBy: { createdAt: 'asc' },
      take: 100 // Limit to last 100 messages
    });
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { sender, content } = await req.json();
    
    if (!sender || !content) {
      return NextResponse.json({ error: "Sender and content required" }, { status: 400 });
    }

    const message = await prisma.chatMessage.create({
      data: { sender, content }
    });

    return NextResponse.json(message);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}