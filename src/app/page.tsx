import { CreateTodo } from "@/components/CreateTodo";
import Todos from "@/components/Todos";
import {  UserButton, auth } from "@clerk/nextjs";

export default async function Home({searchParams}:{searchParams?: { [key: string]: string | string[] | undefined };}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
      <h1 className="font-bold text-4xl ">RememBro</h1>
    <UserButton afterSignOutUrl="/sign-in" />
      </div>
    <Todos/>
    <CreateTodo/>
    </div>
  )
}
