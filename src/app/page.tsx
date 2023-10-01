import Todos from "@/components/Todos";
import { UserButton, auth } from "@clerk/nextjs";

export default function Home() {
  const {userId} = auth()
  return (
    <>
    <UserButton afterSignOutUrl="/sign-in" />
    <Todos/>
    </>
  )
}
