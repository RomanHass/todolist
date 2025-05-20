import type { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'
import { changeTodolistFilterAC } from '@/features/todolists/model/todolists-reducer.ts'
import { Button } from '@mui/material'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'

type Props = {
  filter: FilterValues
  currentFilter: FilterValues
  id: string
}

export const FilterButton = ({ filter, currentFilter, id }: Props) => {
  const dispatch = useAppDispatch()

  const changeFilterHandler = () => {
    dispatch(changeTodolistFilterAC({ id, newFilterValue: filter }))
  }
  return (
    <Button
      variant={currentFilter === filter ? 'contained' : 'outlined'}
      color={currentFilter === filter ? 'secondary' : 'primary'}
      onClick={changeFilterHandler}
    >
      {filter}
    </Button>
  )
}