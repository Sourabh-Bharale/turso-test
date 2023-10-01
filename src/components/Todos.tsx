'use client'
import { TodoRequest } from '@/lib/validators/todo'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

type Props = {}

const Todos = (props: Props) => {
    const {data:_todos,isLoading,isFetching} = useQuery({
        queryKey:['todo'],
        queryFn:async ()=>{
            const {data} = await axios.get<TodoRequest[]>('/api/getTodo')
            return data
        }
    })
  return (
    <div>
      {
        _todos?.map((todo)=>(
          <h1>{todo.title}</h1>
        ))
      }
    </div>
  )
}

export default Todos