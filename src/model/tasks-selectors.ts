import { TasksStateType } from '../App'
import { RootState } from '../app/strore'

export const selectTasks = (state: RootState): TasksStateType => state.tasks
