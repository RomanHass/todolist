import { ChangeEvent } from 'react'
import { EditableSpan } from './EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import { Box, ListItem } from '@mui/material'
import { IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { getListItemSx } from './Todolist.styles'
import { TaskType } from '../model/tasks-reducer'

type PropsType = TaskType & {
  todolistId: string
  onChange: (todolistId: string, taskId: string, isDone: boolean) => void
  deleteTask: () => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = ({ todolistId, id, isDone, title, onChange, deleteTask, updateTaskTitle }: PropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(todolistId, id, e.currentTarget.checked)
  }

  const updateTaskTitleHandler = (title: string) => {
    updateTaskTitle(todolistId, id, title)
  }

  return (
    <ListItem disablePadding>
      <Checkbox size="small" checked={isDone} onChange={onChangeTaskStatusHandler} />
      <Box sx={getListItemSx(isDone)}>
        <EditableSpan oldTitle={title} updateItemTitle={updateTaskTitleHandler} />
      </Box>
      <IconButton onClick={deleteTask}>
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  )
}
