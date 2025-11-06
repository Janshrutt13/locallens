import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Asul } from "next/font/google"

export async function GET(_:Request , {params} : {params : { id : string}}){
    try{
        const reviews = await prisma.review.findMany({
            where : {serviceId : params.id},
            include : {user : {select : { name : true}}},
            orderBy : {createdAt : "desc"},
        })
        return NextResponse.json(reviews);
    }catch(err){
       console.error(err)
       return NextResponse.json({error : "Failed to fetch Reviews"} , { status : 500})
    }
}