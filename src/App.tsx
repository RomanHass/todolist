import { useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist'

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: false },
    { id: 6, title: 'RTK query', isDone: false },
  ])

  const [filter, setFilter] = useState('All')

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const changeFilter = (title: FilterValuesType) => {
    setFilter(title)
  }

  let filteredTaks = tasks

  if (filter === 'Completed') {
    filteredTaks = tasks.filter(t => t.isDone)
  }
  if (filter === 'Active') {
    filteredTaks = tasks.filter(t => !t.isDone)
  }

  return (
    <div className="app">
      <Todolist title={'What to learn'} tasks={filteredTaks} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  )
}

export default App
