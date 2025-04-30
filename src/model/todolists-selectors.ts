import { RootState } from '../app/strore'
import { TodolistType } from './todolists-reducer'

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists
