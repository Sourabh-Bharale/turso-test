'use client'
import { TodoRequest } from '@/lib/validators/todo'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Todo from './Todo'
import { DrizzleTodos } from '@/lib/db/schema'
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const tabs = [{
  tab: 'Todo',
  completed: 'false'
},
{
  tab: 'Completed',
  completed: 'true'
}
]
const Todos = () => {
  const searchParams = useSearchParams()
  const completed = searchParams.get('completed') || 'false'

  const { data: _todos, isLoading, isFetching } = useQuery({
    queryKey: ['todo', completed],
    refetchInterval: 5000,
    queryFn: async () => {
      const { data } = await axios.get<DrizzleTodos[]>('/api/getTodo?completed=' + completed)
      return data
    }
  })
  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-2">
      {
        tabs.map((tab, idx) => (
          <Link href={`/?completed=${tab.completed}`} className={buttonVariants({ variant: tab.completed === completed ? "default" : "secondary" })} key={idx} >{tab.tab}</Link>
        ))
      }
      </div>
      <div className="flex flex-col gap-2">
      {
        _todos?.map((todo) => (
          <Todo todo={todo} />
          ))
        }
        </div>
    </div>
  )
}


export default Todos