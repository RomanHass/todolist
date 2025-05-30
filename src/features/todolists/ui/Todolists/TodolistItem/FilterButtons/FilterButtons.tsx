import { Box } from '@mui/material';
import { Todolist } from '@/features/todolists/model/todolists-reducer.ts';
import { containerSx } from '@/common/styles/container.style.ts'
import { FilterButton } from './FilterButton/FilterButton.tsx'
import type { FilterValues } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx'

const buttons: FilterValues[] = ['all', 'active', 'completed']

export const FilterButtons = ({ todolist }: Props) => {

  const { id, filter } = todolist

  return (
    <Box sx={containerSx}>
      {buttons.map(button => (
        <FilterButton key={button} filter={button} currentFilter={filter} id={id}/>
      ))}
    </Box>
  )
}

type Props = {
  todolist: Todolist
}