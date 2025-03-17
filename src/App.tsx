import './App.css'
import { Todolist } from './components/Todolist'

export const App = () => {
  return (
    <div className="app">
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  )
}

export default App
