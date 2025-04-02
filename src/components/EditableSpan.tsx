import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'

type PropsType = {
  className?: string
  oldTitle: string
  updateItemTitle: (title: string) => void
}

export const EditableSpan = ({ className, oldTitle, updateItemTitle }: PropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [updateTitle, setUpdateTitle] = useState(oldTitle)

  const changeEditMode = () => {
    setEditMode(!editMode)
    if (editMode) {
      updateItemTitle(updateTitle)
    }
  }

  const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField variant="standard" value={updateTitle} autoFocus onBlur={changeEditMode} onChange={updateTitleHandler} />
  ) : (
    <span className={className} onDoubleClick={changeEditMode}>
      {updateTitle}
    </span>
  )
}
