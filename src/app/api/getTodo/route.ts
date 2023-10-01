import { db } from "@/lib/db"
import { todos } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import z from "zod"

export async function GET(req: Request, res: Response) {
    try{
        const {userId} = await auth()
        if(!userId)
        return new Response('Unauthorized', { status: 200 })

        const alltodos = await db.select().from(todos).where(eq(todos.user_id,userId))
        return new Response(JSON.stringify(alltodos), { status: 200 })

    }catch(error){
        if(error instanceof z.ZodError)
            return new Response(error.message,{status:422})

    return new Response('Could not fetch todos', { status: 500 })
    }
}