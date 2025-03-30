import { useState } from 'react'
import './App.css'
import { FilterValuesType, Todolist } from './components/Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const addTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: TodolistType = { id: todolistId, title, filter: 'all' }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [todolistId]: [] })
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
  }

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = { id: v1(), title, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone } : t)) })
  }

  const changeTodolistFilter = (todolistId: string, newFilterValue: FilterValuesType) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl)))
  }

  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)) })
  }

  return (
    <div className="app">
      <div>
        <h3>Добавить тудулист:</h3>
        <AddItemForm addItem={addTodolist} />
      </div>
      {todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            removeTask={removeTask}
            addItem={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            updateTaskTitle={updateTaskTitle}
          />
        )
      })}
    </div>
  )
}

export default App
