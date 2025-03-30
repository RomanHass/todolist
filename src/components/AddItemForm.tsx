import Button from '@mui/material/Button'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'

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
      <TextField
        size="small"
        variant="outlined"
        // className={error ? 'error' : ''}
        value={inputValue}
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        error={!!error}
        helperText={error}
      />
      <Button variant="contained" onClick={() => addItemHandler(inputValue)}>
        <AddIcon />
      </Button>
      {/* {error && <div className={'errorMessage'}>{error}</div>} */}
    </div>
  )
}
