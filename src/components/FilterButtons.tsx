import { containerSx } from '@/components/Todolist.styles.ts';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { changeTodolistFilterAC, Todolist } from '@/model/todolists-reducer.ts';
import type { FilterValues } from '@/components/TodolistItem.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';

export const FilterButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const { id: todolistId, filter } = todolist

  const changeFilterHandler = (newFilterValue: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, newFilterValue }))
  }
  
  return (
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
  )
}

type Props = {
  todolist: Todolist
}