'use client'
import { TodoRequest } from "@/lib/validators/todo"
import { Checkbox } from "./ui/checkbox"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useToast } from "./ui/use-toast"
import { DrizzleTodos } from "@/lib/db/schema"
import { useState } from "react"
import { Delete, DeleteIcon } from "lucide-react"



type Props = {
    todo:DrizzleTodos
}

const Todo = ({todo}: Props) => {
    const {toast} = useToast()
    const [checked,setChecked] = useState<boolean>(todo.completed)
    const queryClient = useQueryClient()
    const {mutate:_updateTodo,isLoading} = useMutation({
        mutationKey:['todo'],
        mutationFn:async ()=>{
            const payload: Pick<DrizzleTodos,'completed'|'id'> = {
                completed:!todo.completed,
                id:todo.id
            }
            const {data} = await axios.post('/api/updateTodo',payload)
            return data
        },
        onError: async (error)=>{
            setChecked(todo.completed)
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
            return toast({
                title:'An error occured',
                variant:'destructive'
            })
        },
        onSuccess:async ()=>{
            setChecked(!todo.completed)
            queryClient.invalidateQueries({queryKey:['todo']})
        }
    })
    const {mutate:_deleteTodo} = useMutation({
        mutationKey:['todo'],
        mutationFn:async ()=>{
            const payload: Pick<DrizzleTodos,'id'> = {
                id:todo.id
            }
            const {data} = await axios.post('/api/deleteTodo',payload)
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
            return toast({
                title:'An error occured',
                variant:'destructive'
            })
        },
        onSuccess:async ()=>{
            queryClient.invalidateQueries({queryKey:['todo']})
        }
    })
  return (
    <>
    <div className="flex flex-col border-2 p-2 rounded-xl">
        <h1>{todo.title}</h1>
        <h1>{todo.description}</h1>
        <div className="flex gap-2 items-center">
        <Checkbox checked={checked} onClick={()=>{_updateTodo()}} onChange={()=>setChecked(!checked)}/>
        <Delete onClick={()=>{_deleteTodo()}} className="w-5 h-5 fill-destructive"/>
        </div>
    </div>
    </>
  )
}

export default Todo