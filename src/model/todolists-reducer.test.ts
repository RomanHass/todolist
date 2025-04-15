import { v1 } from 'uuid'
import { beforeEach, expect, test } from 'vitest'
import {
  createTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  todolistsReducer,
  TodolistType,
  updateTodolistTitleAC,
} from './todolists-reducer'

let todolistId1: string
let todolistId2: string

let startState: TodolistType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
})

test('correct todolist should be created', () => {
  const title = 'New Todolist'
  const id = v1()

  const endState = todolistsReducer(startState, createTodolistAC({ id, title }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe('What to learn')
  expect(endState[2].title).toBe(title)
})

test('correct todolist should be deleted', () => {
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be change its title', () => {
  const title = 'What to do'

  const endState = todolistsReducer(startState, updateTodolistTitleAC({ id: todolistId1, title }))

  expect(endState[0].title).toBe(title)
  expect(endState[1].title).toBe('What to buy')
})

test('correct todolist should be change its filter', () => {
  const filter = 'completed'

  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, newFilterValue: filter }))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})
