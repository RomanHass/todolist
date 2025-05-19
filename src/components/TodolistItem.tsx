import { type Todolist } from '@/model/todolists-reducer.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import { createTaskAC } from '@/model/tasks-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { TodolistTitle } from '@/components/TodolistTitle.tsx';
import { CreateItemForm } from '@/components/CreateItemForm.tsx';
import { Tasks } from '@/components/Tasks.tsx';
import { FilterButtons } from './FilterButtons.tsx';

export const TodolistItem = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
  }

  let todolistTasks = tasks[todolist.id]

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm addItem={createTaskHandler}/>
      {todolistTasks.length === 0 ? <p>Тасок нет</p> : <Tasks todolist={todolist}/>}
      <FilterButtons todolist={todolist}/>
    </div>
  )
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
  todolist: Todolist
}