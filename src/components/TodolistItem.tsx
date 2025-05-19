import { Task } from './Task'
import { AddItemForm } from './AddItemForm'
import Button from '@mui/material/Button'
import { Box, List } from '@mui/material'
import { containerSx } from './Todolist.styles'
import { changeTodolistFilterAC, type Todolist } from '@/model/todolists-reducer.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import { createTaskAC, deleteTaskAC } from '@/model/tasks-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { TodolistTitle } from '@/components/TodolistTitle.tsx';

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

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed': {
        return todolistTasks.filter(t => t.isDone)
      }
      case 'active': {
        return todolistTasks.filter(t => !t.isDone)
      }
      default:
        return todolistTasks
    }
  }

  let filteredTasks = getFilteredTasks()

  const tasksForTodolist = filteredTasks.map(t => {
    const deleteTaskHandler = () => {
      dispatch(deleteTaskAC({ todolistId, taskId: t.id }))
    }

    return (
      <Task
        key={t.id}
        id={t.id}
        todolistId={todolistId}
        isDone={t.isDone}
        title={t.title}
        deleteTask={deleteTaskHandler}
      />
    )
  })

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={createTaskHandler}/>
      {todolistTasks.length === 0 ? <p>Тасок нет</p> : <List>{tasksForTodolist}</List>}
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
  todolist: Todolist,
}