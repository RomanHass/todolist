import { v1 } from 'uuid'
import { expect, test } from 'vitest'
import { todolistsReducer, TodolistType } from './todolists-reducer'

test('correct todolist should be deleted', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  // 1. Стартовый state
  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  // 2. Действие
  const action = {
    type: 'delete_todolist',
    payload: {
      id: todolistId1,
    },
  } as const

  const endState = todolistsReducer(startState, action)

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const title = 'New Todolist'

  const action = {
    type: 'add_todolist',
    payload: {
      title,
    },
  } as const

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test('correct todolist should be change its title', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const title = 'What to do'

  const action = {
    type: 'update_todolist_title',
    payload: {
      id: todolistId1,
      title,
    },
  } as const

  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe(title)
})

test('correct todolist should be change its filter', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]

  const filter = 'completed'

  const action = {
    type: 'change_todolist_filter',
    payload: {
      id: todolistId2,
      newFilterValue: filter,
    },
  } as const

  const endState = todolistsReducer(startState, action)

  expect(endState[1].filter).toBe(filter)
})
