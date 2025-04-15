import { v1 } from 'uuid'
import { TasksStateType, TaskType } from '../App'
import { CreateTodolistActionType, DeleteTodolistActionType } from './todolists-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: Actions): TasksStateType => {
  switch (action.type) {
    case 'create_todolist': {
      return { ...state, [action.payload.id]: [] }
    }
    case 'delete_todolist': {
      const { id } = action.payload
      const newState = { ...state }
      delete newState[id]
      return newState
    }
    case 'delete_task': {
      const { todolistId, taskId } = action.payload
      return { ...state, [todolistId]: state[todolistId].filter(t => t.id !== taskId) }
    }
    case 'create_task': {
      const { todolistId, title } = action.payload
      const newTask: TaskType = { id: v1(), title, isDone: false }
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] }
    }
    case 'change_task_status': {
      const { todolistId, taskId, isDone } = action.payload
      return { ...state, [todolistId]: state[todolistId].map(t => (t.id === taskId ? { ...t, isDone } : t)) }
    }
    case 'update_task_title': {
      const { todolistId, taskId, title } = action.payload
      return { ...state, [todolistId]: state[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)) }
    }
    default:
      return state
  }
}

export const deleteTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: 'delete_task', payload } as const
}

export const createTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: 'create_task', payload } as const
}

export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => {
  return { type: 'change_task_status', payload } as const
}

export const updateTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: 'update_task_title', payload } as const
}

export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type CreateTaskActionType = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskTitleActionType = ReturnType<typeof updateTaskTitleAC>

type Actions =
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | DeleteTaskActionType
  | CreateTaskActionType
  | ChangeTaskStatusActionType
  | UpdateTaskTitleActionType
