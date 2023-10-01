import { db } from "@/lib/db";
import { todos } from "@/lib/db/schema";
import { TodoValidator } from "@/lib/validators/todo";
import { auth } from "@clerk/nextjs";
import z from "zod";

export async function POST(req:Request,res:Response){
    try{
        const {userId} = await auth()
        if(!userId)
            return new Response('Unauthorized',{status:200})
        const body = await req.json()
        const {completed,description,title} = TodoValidator.parse(body)
        const response = await db.insert(todos).values({
            title,
            description,
            completed,
            user_id:userId
        })
        return new Response(JSON.stringify(response),{status:200})
    }catch(error){
        if(error instanceof z.ZodError)
            return new Response(error.message,{status:422})
    }
}