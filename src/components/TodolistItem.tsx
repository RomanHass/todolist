import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import { containerSx } from './Todolist.styles'
import { changeTodolistFilterAC, type Todolist } from '@/model/todolists-reducer.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import { createTaskAC } from '@/model/tasks-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { TodolistTitle } from '@/components/TodolistTitle.tsx';
import { CreateItemForm } from '@/components/CreateItemForm.tsx';
import { Tasks } from '@/components/Tasks.tsx';

export const TodolistItem = ({ todolist }: Props) => {
  const { id: todolistId, filter } = todolist
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ todolistId, title }))
  }

  const changeFilterHandler = (newFilterValue: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, newFilterValue }))
  }

  let todolistTasks = tasks[todolistId]

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm addItem={createTaskHandler}/>
      {todolistTasks.length === 0 ? <p>Тасок нет</p> : <Tasks todolist={todolist}/>}
      <Box sx={containerSx}>
        <Button
          variant="contained"
          color={filter === 'all' ? 'secondary' : 'primary'}
          onClick={() => changeFilterHandler('all')}
        >
          All
        </Button>
        <Button
          variant="contained"
          color={filter === 'active' ? 'secondary' : 'primary'}
          onClick={() => changeFilterHandler('active')}
        >
          Active
        </Button>
        <Button
          variant="contained"
          color={filter === 'completed' ? 'secondary' : 'primary'}
          onClick={() => changeFilterHandler('completed')}
        >
          Completed
        </Button>
      </Box>
    </div>
  )
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
  todolist: Todolist
}