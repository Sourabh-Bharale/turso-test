import { db } from "@/lib/db"
import { DrizzleTodos, todos } from "@/lib/db/schema"
import { eq } from "drizzle-orm"


export async function POST(req:Request,res:Response){
    try {
        const {id,completed}:Pick<DrizzleTodos,'completed'|'id'> = await req.json()
        const response = await db.update(todos)
        .set({
            completed
        })
        .where(eq(todos.id,id))
        return new Response(JSON.stringify(response),{status:200})

    } catch (error) {
        return new Response('Could not update todo',{status:500})
    }
}