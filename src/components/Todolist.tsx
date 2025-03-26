import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'

export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTask: (todolistId: string, taskId: string) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTodolistFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
}

export const Todolist = ({
  todolistId,
  title,
  tasks,
  filter,
  removeTask,
  addTask,
  changeTaskStatus,
  changeTodolistFilter,
}: PropsType) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<null | string>(null)

  const addTaskHandler = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      addTask(todolistId, trimmedValue)
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

  const changeTaskStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => {
    changeTaskStatus(todolistId, taskId, isDone)
  }

  const changeFilterHandler = (newFilerValue: FilterValuesType) => {
    changeTodolistFilter(todolistId, newFilerValue)
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
      removeTask(todolistId, t.id)
    }

    return (
      <div key={t.id} style={{ display: 'flex' }}>
        <Task
          className={t.isDone ? 'is-done' : ''}
          id={t.id}
          todolistId={todolistId}
          isDone={t.isDone}
          title={t.title}
          onChange={changeTaskStatusHandler}
        />
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
        <Button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('all')}
          title={'All'}
        />
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('active')}
          title={'Active'}
        />
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('completed')}
          title={'Completed'}
        />
      </div>
    </div>
  )
}
