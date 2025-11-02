import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";


export async function GET() {
    try{
        const services = await prisma.service.findMany({
            include : { owner : { select : {name : true , email : true}}},
            orderBy : { createdAt : 'desc'}
        })
        return NextResponse.json(services);

    }catch(err){
       console.error(err);
       return NextResponse.error();
    }
}

export async function POST(req : Request){
    try{
       const token = req.headers.get('authorization')?.split(" ")[1];
       if(!token) return NextResponse.json({ error : "Unauthorized"} , {status : 401})

       const user = verifyJwt(token)
       if(!user) return NextResponse.json({ error : "Invalid token"} , {status : 401})

       const {title , description , tags } = await req.json();

       const service = await prisma.service.create({
        data : {
            title,
            description,
            tags,
            ownerId : user.id
        }
       })

       return NextResponse.json(service);

    }catch(err){
       console.error(err);
       return NextResponse.error();
    }
}