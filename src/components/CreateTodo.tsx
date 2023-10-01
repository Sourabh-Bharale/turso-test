'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TodoRequest } from "@/lib/validators/todo"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useToast } from "./ui/use-toast"


export function CreateTodo() {
    const [title,setTitle] = useState<string>('')
    const queryClient = useQueryClient()
    const [description,setDescription] = useState<string>('')
    const {toast} = useToast()
    const {mutate:createTodo,isLoading} = useMutation({
        mutationKey:['todo'],
        mutationFn:async ()=>{
            const payload: TodoRequest = {
                title,
                description,
                completed:false
            }
            const {data} = await axios.post('/api/createTodo',payload)
            return data
        },
        onError: async (error)=>{
            if(error instanceof AxiosError){
                if(error.response?.status===400){
                    return toast({
                        title:error.response.data.message,
                        variant:'destructive'
                    })
                }
                return toast({
                    title:error.message,
                    variant:'destructive'
                })
            }
            setTitle('')
            setDescription('')
            return toast({
                title:'An error occured',
                variant:'destructive'
            })
        },
        onSuccess:async ()=>{
            setTitle('')
            setDescription('')
            queryClient.invalidateQueries({queryKey:['todo']})
            return toast({
                title:'Todo created successfully',
            })
        }
    })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
            Create new
            <PlusCircledIcon className="w-5 h-5"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            create a new todo for your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="col-span-3"
              placeholder="What's on your mind?"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Describe your todo here"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button isLoading={isLoading} disabled={isLoading} onClick={()=>createTodo()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
