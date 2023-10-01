import { db } from "@/lib/db"
import { todos } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import z from "zod"

export async function GET(req: Request, res: Response) {
    try{
        const {userId} = await auth()
        if(!userId)
        return new Response('Unauthorized', { status: 200 })
        const {searchParams} = new URL(req.url)
        const completed = searchParams.get('completed') ==='true'
        let alltodos
        if(completed){
             alltodos = await db.select().from(todos).where(and(eq(todos.user_id,userId),eq(todos.completed,true)))
        }else{
            alltodos = await db.select().from(todos).where(and(eq(todos.user_id,userId),eq(todos.completed,false)))
        }
        return new Response(JSON.stringify(alltodos), { status: 200 })

    }catch(error){
        if(error instanceof z.ZodError)
            return new Response(error.message,{status:422})

    return new Response('Could not fetch todos', { status: 500 })
    }
}