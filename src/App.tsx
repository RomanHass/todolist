import { useState } from 'react'
import './App.css'
import { FilterValuesType, Todolist } from './components/Todolist'
import { v1 } from 'uuid'

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
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: v1(), title: 'What to learn', filter: 'all' },
    { id: v1(), title: 'What to buy', filter: 'all' },
  ])

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId))
  }

  const addTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks([newTask, ...tasks])
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, isDone } : t)))
  }

  const changeTodolistFilter = (todolistId: string, newFilterValue: FilterValuesType) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl)))
  }

  return (
    <div className="app">
      {todolists.map(tl => (
        <Todolist
          key={tl.id}
          id={tl.id}
          title={tl.title}
          tasks={tasks}
          filter={tl.filter}
          removeTask={removeTask}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
          changeTodolistFilter={changeTodolistFilter}
        />
      ))}
    </div>
  )
}

export default App
