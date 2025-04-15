import { FilterValuesType } from '../components/Todolist'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

const initialState: TodolistType[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'create_todolist': {
      const { id, title } = action.payload
      return [...state, { id, title, filter: 'all' }]
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

export const createTodolistAC = (payload: { id: string; title: string }) => {
  return { type: 'create_todolist', payload } as const
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

type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
type UpdateToodlistActionType = ReturnType<typeof updateTodolistTitleAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | UpdateToodlistActionType
  | ChangeTodolistFilterActionType
