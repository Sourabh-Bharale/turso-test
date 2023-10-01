import { db } from "@/lib/db"
import { todos } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req:Request,res:Response){
    try {
        const {id} = await req.json()
        const response = await db.delete(todos).where(eq(todos.id,id))
        return new Response(JSON.stringify(response),{status:200})
    } catch (error) {
        return new Response('Could not delete todo',{status:500})
    }
}