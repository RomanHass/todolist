import { Task } from './Task'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import Button from '@mui/material/Button'
import { Box, IconButton, List, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { containerSx } from './Todolist.styles'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC,
  type Todolist
} from '@/model/todolists-reducer.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import { createTaskAC, deleteTaskAC } from '@/model/tasks-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';

export type FilterValues = 'all' | 'active' | 'completed'

type PropsType = {
  todolist: Todolist,
}

export const TodolistItem = ({todolist}: PropsType) => {
  const {id: todolistId, title, filter} = todolist
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({id: todolistId}))
  }

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({todolistId, title}))
  }

  const changeFilterHandler = (newFilterValue: FilterValues) => {
    dispatch(changeTodolistFilterAC({id: todolistId, newFilterValue}))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({id: todolistId, title}))
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '10px' }}>
        <Typography variant="h6" fontWeight={700}>
          <EditableSpan oldTitle={title} updateItemTitle={changeTodolistTitleHandler} className={'title'} />
        </Typography>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteForeverIcon />
        </IconButton>
      </Box>
      <AddItemForm addItem={createTaskHandler} />
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
