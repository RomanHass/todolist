import { RootState } from '@/app/strore.ts'
import { Todolist } from './todolists-reducer.ts'

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
