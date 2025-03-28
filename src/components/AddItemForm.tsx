import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'

export type PropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: PropsType) => {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<null | string>(null)

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setInputValue(e.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler(e.currentTarget.value)
    }
  }

  const addItemHandler = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      addItem(trimmedValue)
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
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
      />
      <Button
        title={'+'}
        onClick={() => {
          addItemHandler(inputValue)
        }}
      />
      {error && <div className={'errorMessage'}>{error}</div>}
    </div>
  )
}
