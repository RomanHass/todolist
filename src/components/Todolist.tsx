import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { FilterValuesType, TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  addTask: (title: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
}

export const Todolist = ({ title, tasks, removeTask, addTask, changeTaskStatus }: PropsType) => {
  const [filter, setFilter] = useState('all')
  let [inputValue, setInputValue] = useState('')
  let [error, setError] = useState<null | string>(null)

  const addTaskHandler = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      addTask(trimmedValue)
      setInputValue('')
    } else {
      setError('Title is required!')
    }
  }

  const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
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

    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
      changeTaskStatus(taskId, isDone)
    }

    return (
      <div key={t.id} style={{ display: 'flex' }}>
        <Task id={t.id} isDone={t.isDone} title={t.title} onChange={changeTaskStatusHandler} />
        <Button onClick={removeTaskHandler} title={'x'} />
      </div>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={inputValue}
          onChange={onChangeTaskTitleHandler}
          onKeyUp={onKeyUpHandler}
        />
        <Button
          title={'+'}
          onClick={() => {
            addTaskHandler(inputValue)
          }}
        />
        {error && <div className={'errorMessage'}>{error}</div>}
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
