import { type Todolist } from '@/features/todolists/model/todolists-reducer.ts';
import { createTaskAC } from '@/features/todolists/model/tasks-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { TodolistTitle } from './TodolistTitle/TodolistTitle.tsx';
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import { Tasks } from './Tasks/Tasks.tsx';
import { FilterButtons } from './FilterButtons/FilterButtons.tsx'

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