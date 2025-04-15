import { v1 } from 'uuid'
import { FilterValuesType } from '../components/Todolist'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'create_todolist': {
      const { title } = action.payload
      return [...state, { id: v1(), title, filter: 'all' }]
    }
    case 'delete_todolist': {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'update_todolist_title': {
      return state.map(tl => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }
    case 'change_todolist_filter': {
      return state.map(tl => (tl.id === action.payload.id ? { ...tl, filter: action.payload.newFilterValue } : tl))
    }
    default:
      return state
  }
}

export const createTodolistAC = (title: string) => {
  return { type: 'create_todolist', payload: { id: v1(), title } } as const
}

export const deleteTodolistAC = (id: string) => {
  return {
    type: 'delete_todolist',
    payload: { id },
  } as const
}

export const updateTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: 'update_todolist_title', payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; newFilterValue: FilterValuesType }) => {
  return { type: 'change_todolist_filter', payload } as const
}

export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type UpdateToodlistActionType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | UpdateToodlistActionType
  | ChangeTodolistFilterActionType
