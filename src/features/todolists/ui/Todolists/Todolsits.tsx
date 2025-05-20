import Grid from '@mui/material/Grid'
import { Paper } from '@mui/material'
import { TodolistItem } from './TodolistItem/TodolistItem'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectTodolists } from '@/features/todolists/model/todolists-selectors'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists?.map(tl => (
        <Grid key={tl.id}>
          <Paper elevation={5} sx={{ p: '15px' }}>
            <TodolistItem todolist={tl}/>
          </Paper>
        </Grid>
      ))}
    </>
  )
}