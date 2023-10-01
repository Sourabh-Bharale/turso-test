import { CreateTodo } from "@/components/CreateTodo";
import Todos from "@/components/Todos";
import {  UserButton, auth } from "@clerk/nextjs";

export default async function Home({searchParams}:{searchParams?: { [key: string]: string | string[] | undefined };}) {
  const {userId} = auth()
  return (
    <>
    <UserButton afterSignOutUrl="/sign-in" />
    <Todos/>
    <CreateTodo/>
    </>
  )
}
