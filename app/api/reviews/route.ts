import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyJWT } from "@/lib/jwt"
import { error } from "console";
import { json, jwt } from "zod";


export async function POST(req : Request){
    try{
        const token = req.headers.get("authorization")?.split("")[1];
        if(!token) return NextResponse.json({ error : 'Unauthorized'} , {status : 401})
        
        const decoded = verifyJWT(token);
        const {serviceId , rating , comment} = await req.json();

        if(!serviceId || !rating){
            return NextResponse.json({ error : 'Missing required fields'} , { status : 401});
        }

        const review = await prisma.review.create({
            data : {
                serviceId,
                rating : Number(rating),
                comment : comment || "",
                userId : decoded.id
            }
        })

        return NextResponse.json(review);
    }catch(err){
        console.error(err);
        return NextResponse.json({ error : 'Failed to post a review'} , {status : 500})
    }
}