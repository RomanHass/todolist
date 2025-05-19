import { Box, IconButton, Typography } from '@mui/material';
import { EditableSpan } from '@/components/EditableSpan.tsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { changeTodolistTitleAC, deleteTodolistAC, Todolist } from '@/model/todolists-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';

export const TodolistTitle = ({ todolist }: Props) => {
  const { id: todolistId, title } = todolist
  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({ id: todolistId }))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }))
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '10px' }}>
      <Typography variant="h6" fontWeight={700}>
        <EditableSpan oldTitle={title}
                      updateItemTitle={changeTodolistTitleHandler}
                      className={'title'}/>
      </Typography>
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteForeverIcon/>
      </IconButton>
    </Box>
  )
}

type Props = {
  todolist: Todolist
}