import { ChangeEvent } from 'react'
import { EditableSpan } from './EditableSpan'
import Checkbox from '@mui/material/Checkbox'
import { Box, IconButton, ListItem } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { getListItemSx } from './Todolist.styles'
import { changeTaskStatusAC, changeTaskTitleAC, TaskType } from '../model/tasks-reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';

type PropsType = TaskType & {
  todolistId: string
  deleteTask: () => void
}

export const Task = ({ todolistId, id, isDone, title, deleteTask }: PropsType) => {
  const dispatch = useAppDispatch()

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId: id, isDone: e.currentTarget.checked }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: id, title }))
  }

  return (
    <ListItem disablePadding>
      <Checkbox size="small" checked={isDone} onChange={changeTaskStatus} />
      <Box sx={getListItemSx(isDone)}>
        <EditableSpan oldTitle={title} updateItemTitle={changeTaskTitle} />
      </Box>
      <IconButton onClick={deleteTask}>
        <DeleteForeverIcon />
      </IconButton>
    </ListItem>
  )
}
