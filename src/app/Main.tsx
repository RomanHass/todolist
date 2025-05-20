import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { CreateItemForm } from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import Container from '@mui/material/Container';
import { createTodolistAC } from '@/features/todolists/model/todolists-reducer.ts';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { Todolists } from '@/features/todolists/ui/Todolists/Todolsits.tsx';

export const Main = () => {
  const dispatch = useAppDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  return (
    <Container maxWidth="lg">
      <Grid container alignItems={'center'} sx={{ p: '20px 0' }} columnGap={'10px'}>
        <Typography variant={'h6'} fontWeight={700}>
          Добавить тудулист:
        </Typography>
        <CreateItemForm addItem={createTodolist}/>
      </Grid>
      <Grid container spacing={4}>
        <Todolists/>
      </Grid>
    </Container>
  )
}

