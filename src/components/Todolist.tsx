import { useRef, useState } from 'react'
import { FilterValuesType, TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  addTask: (title: string) => void
}

export const Todolist = ({ title, tasks, removeTask, addTask }: PropsType) => {
  const [filter, setFilter] = useState('All')

  const inputRef = useRef<HTMLInputElement>(null)

  const changeFilter = (title: FilterValuesType) => {
    setFilter(title)
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'Completed': {
        return tasks.filter(t => t.isDone)
      }
      case 'Active': {
        return tasks.filter(t => !t.isDone)
      }
      default:
        return tasks
    }
  }

  let filteredTasks = getFilteredTasks()

  const tasksForTodolist = filteredTasks.map(t => {
    return (
      <div style={{ display: 'flex' }}>
        <Task key={t.id} isDone={t.isDone} title={t.title} />
        <Button onClick={() => removeTask(t.id)} title={'x'} />
      </div>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={inputRef} />
        <Button
          title={'+'}
          onClick={() => {
            if (inputRef.current) {
              addTask(inputRef.current.value)
              inputRef.current.value = ''
            }
          }}
        />
      </div>
      <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
        {tasks.length === 0 ? <p>Тасок нет</p> : tasksForTodolist}
      </ul>
      <div>
        <Button onClick={() => changeFilter('All')} title={'All'} />
        <Button onClick={() => changeFilter('Active')} title={'Active'} />
        <Button onClick={() => changeFilter('Completed')} title={'Completed'} />
      </div>
    </div>
  )
}
