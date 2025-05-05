import { nanoid } from '@reduxjs/toolkit'
import { CreateTodolistAction, DeleteTodolistAction } from './todolists-reducer'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = Record<string, TaskType[]>

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
      const newTask: TaskType = { id: nanoid(), title, isDone: false }
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

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
export type CreateTaskAction = ReturnType<typeof createTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskTitleAction = ReturnType<typeof updateTaskTitleAC>

type Actions =
  | CreateTodolistAction
  | DeleteTodolistAction
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | UpdateTaskTitleAction
