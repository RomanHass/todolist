import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TodolistItem } from '@/components/TodolistItem.tsx';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTodolists } from '@/model/todolists-selectors.ts';

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  return (
    <>
      {todolists?.map(tl => {
        return (
          <Grid key={tl.id}>
            <Paper elevation={5} sx={{ p: '15px' }}>
              <TodolistItem todolist={tl}/>
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}