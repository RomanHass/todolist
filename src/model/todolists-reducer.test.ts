import { v1 } from 'uuid'
import { expect, test } from 'vitest'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  todolistsReducer,
  TodolistType,
  updateTodolistTitleAC,
} from './todolists-reducer'

test('correct todolist should be created', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const title = 'New Todolist'

  const endState = todolistsReducer(startState, addTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test('correct todolist should be deleted', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be change its title', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const title = 'What to do'

  const endState = todolistsReducer(startState, updateTodolistTitleAC({ id: todolistId1, title }))

  expect(endState[0].title).toBe(title)
  expect(endState[1].title).toBe('What to buy')
})

test('correct todolist should be change its filter', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const filter = 'completed'

  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, newFilterValue: filter }))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})
