import { RootState } from '../app/strore'
import { TasksStateType } from './tasks-reducer'

export const selectTasks = (state: RootState): TasksStateType => state.tasks
