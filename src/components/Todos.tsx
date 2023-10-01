'use client'
import { TodoRequest } from '@/lib/validators/todo'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Todo from './Todo'
import { DrizzleTodos } from '@/lib/db/schema'

type Props = {}

const Todos = (props: Props) => {
    const {data:_todos,isLoading,isFetching} = useQuery({
        queryKey:['todo'],
        queryFn:async ()=>{
            const {data} = await axios.get<DrizzleTodos[]>('/api/getTodo')
            return data
        }
    })
  return (
    <div>
      {
        _todos?.map((todo)=>(
          <Todo todo={todo}/>
        ))
      }
    </div>
  )
}

export default Todos