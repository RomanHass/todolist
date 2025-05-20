import { RootState } from '@/app/strore.ts'
import { TasksState } from './tasks-reducer.ts'

export const selectTasks = (state: RootState): TasksState => state.tasks
