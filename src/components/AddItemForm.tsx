import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'

export type PropsType = {
  todolistId: string
  addTask: (todolistId: string, title: string) => void
}

export const AddItemForm = ({ todolistId, addTask }: PropsType) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<null | string>(null)

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }

  const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler(e.currentTarget.value)
    }
  }

  const addTaskHandler = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      addTask(todolistId, trimmedValue)
      setInputValue('')
    } else {
      setError('Title is required!')
    }
  }

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={inputValue}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyUpHandler}
      />
      <Button
        title={'+'}
        onClick={() => {
          addTaskHandler(inputValue)
        }}
      />
      {error && <div className={'errorMessage'}>{error}</div>}
    </div>
  )
}
