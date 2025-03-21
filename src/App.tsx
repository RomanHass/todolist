import { useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist'
import { v1 } from 'uuid'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const addTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks([newTask, ...tasks])
  }

  return (
    <div className="app">
      <Todolist title={'What to learn'} tasks={tasks} removeTask={removeTask} addTask={addTask} />
    </div>
  )
}

export default App
