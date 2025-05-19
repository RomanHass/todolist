import { type Todolist } from '@/model/todolists-reducer.ts';
import { createTaskAC } from '@/model/tasks-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { TodolistTitle } from '@/components/TodolistTitle.tsx';
import { CreateItemForm } from '@/components/CreateItemForm.tsx';
import { Tasks } from '@/components/Tasks.tsx';
import { FilterButtons } from './FilterButtons.tsx';

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm addItem={createTaskHandler}/>
      <Tasks todolist={todolist}/>
      <FilterButtons todolist={todolist}/>
    </div>
  )
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
  todolist: Todolist
}