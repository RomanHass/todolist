import { ChangeEvent } from 'react'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import Checkbox from '@mui/material/Checkbox'
import { Box, IconButton, ListItem } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  type Task
} from '@/features/todolists/model/tasks-reducer.ts'
import { getListItemSx } from './TaskItem.styles.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'

export const TaskItem = ({ todolistId, task }: Props) => {
  const { id, isDone, title } = task
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId: id, isDone: e.currentTarget.checked }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: id, title }))
  }

  return (
    <ListItem disablePadding>
      <Checkbox size="small" checked={isDone} onChange={changeTaskStatusHandler}/>
      <Box sx={getListItemSx(isDone)}>
        <EditableSpan oldTitle={title} updateItemTitle={changeTaskTitleHandler}/>
      </Box>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteForeverIcon/>
      </IconButton>
    </ListItem>
  )
}

type Props = {
  task: Task
  todolistId: string
}