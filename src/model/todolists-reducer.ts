import { FilterValuesType } from '../components/Todolist'
import { v1 } from 'uuid'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

const todolistId1 = v1()
const todolistId2 = v1()

const initialState: TodolistType[] = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'add_todolist': {
      const todolistId = v1()
      const newTodolist: TodolistType = { id: todolistId, title: action.payload.title, filter: 'all' }
      return [...state, newTodolist]
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

export type AddTodolistActionType = {
  type: 'add_todolist'
  payload: { title: string }
}

export type DeleteTodolistActionType = {
  type: 'delete_todolist'
  payload: { id: string }
}

export type UpdateTodolistTitleAction = {
  type: 'update_todolist_title'
  payload: { id: string; title: string }
}

export type ChangeTodolistFilterAction = {
  type: 'change_todolist_filter'
  payload: { id: string; newFilterValue: FilterValuesType }
}

type ActionsType =
  | AddTodolistActionType
  | DeleteTodolistActionType
  | UpdateTodolistTitleAction
  | ChangeTodolistFilterAction
