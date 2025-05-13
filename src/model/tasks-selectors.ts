import { RootState } from '../app/strore'
import { TasksState } from './tasks-reducer'

export const selectTasks = (state: RootState): TasksState => state.tasks
