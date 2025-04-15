import { TaskType } from '../App'
import { Task } from './Task'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import Button from '@mui/material/Button'
import { Box, IconButton, List, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { containerSx } from './Todolist.styles'

export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  deleteTodolist: (todolistId: string) => void
  updateTodolistTitle: (todolistId: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  addItem: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTodolistFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Todolist = ({
  todolistId,
  title,
  tasks,
  filter,
  deleteTodolist,
  updateTodolistTitle,
  removeTask,
  addItem,
  changeTaskStatus,
  changeTodolistFilter,
  updateTaskTitle,
}: PropsType) => {
  const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
  }

  const changeTaskStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => {
    changeTaskStatus(todolistId, taskId, isDone)
  }

  const addTaskHandler = (title: string) => {
    addItem(todolistId, title)
  }

  const changeFilterHandler = (newFilerValue: FilterValuesType) => {
    changeTodolistFilter(todolistId, newFilerValue)
  }

  const updateItemTitleHandler = (title: string) => {
    updateTodolistTitle(todolistId, title)
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed': {
        return tasks.filter(t => t.isDone)
      }
      case 'active': {
        return tasks.filter(t => !t.isDone)
      }
      default:
        return tasks
    }
  }

  let filteredTasks = getFilteredTasks()

  const tasksForTodolist = filteredTasks.map(t => {
    const removeTaskHandler = () => {
      removeTask(todolistId, t.id)
    }

    return (
      <Task
        key={t.id}
        id={t.id}
        todolistId={todolistId}
        isDone={t.isDone}
        title={t.title}
        onChange={changeTaskStatusHandler}
        updateTaskTitle={updateTaskTitle}
        removeTask={removeTaskHandler}
      />
    )
  })

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '10px' }}>
        <Typography variant="h6" fontWeight={700}>
          <EditableSpan oldTitle={title} updateItemTitle={updateItemTitleHandler} className={'title'} />
        </Typography>
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteForeverIcon />
        </IconButton>
      </Box>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? <p>Тасок нет</p> : <List>{tasksForTodolist}</List>}
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
