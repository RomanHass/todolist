import { RootState } from '../app/strore'
import { Todolist } from './todolists-reducer'

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
