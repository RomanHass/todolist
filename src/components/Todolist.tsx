import { useState, KeyboardEvent, ChangeEvent } from 'react'
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
  const [filter, setFilter] = useState('all')
  let [inputValue, setInputValue] = useState('')

  const addTaskHandler = (value: string) => {
    addTask(value)
    setInputValue('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler(e.currentTarget.value)
    }
  }

  const changeFilterHandler = (title: FilterValuesType) => {
    setFilter(title)
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed': {
        return tasks.filter(t => t.isDone)
      }
      case 'active': {
        return tasks.filter(t => !t.isDone)
      }
      default:
        return tasks
    }
  }

  let filteredTasks = getFilteredTasks()

  const tasksForTodolist = filteredTasks.map(t => {
    const removeTaskHandler = () => {
      removeTask(t.id)
    }
    return (
      <div style={{ display: 'flex' }}>
        <Task key={t.id} isDone={t.isDone} title={t.title} />
        <Button onClick={removeTaskHandler} title={'x'} />
      </div>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={inputValue} onChange={onChangeHandler} onKeyUp={onKeyUpHandler} />
        <Button
          title={'+'}
          onClick={() => {
            addTaskHandler(inputValue)
          }}
        />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>{tasksForTodolist}</ul>
      )}
      <div>
        <Button onClick={() => changeFilterHandler('all')} title={'All'} />
        <Button onClick={() => changeFilterHandler('active')} title={'Active'} />
        <Button onClick={() => changeFilterHandler('completed')} title={'Completed'} />
      </div>
    </div>
  )
}
