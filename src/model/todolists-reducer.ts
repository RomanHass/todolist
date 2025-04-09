import { FilterValuesType } from '../components/Todolist'
import { v1 } from 'uuid'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type ActionsType = {
  type: string
  payload: any
}

const todolistId1 = v1()
const todolistId2 = v1()

const initialState: TodolistType[] = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'delete_todolist': {
      return state.filter(tl => tl.id !== action.payload.id)
    }
    case 'add_todolist': {
      return state
    }
    default:
      return state
  }
}
