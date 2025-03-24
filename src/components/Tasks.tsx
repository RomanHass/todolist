import { ChangeEvent } from 'react'
import { TaskType } from '../App'

type PropsType = TaskType & {
  onChange: (taskId: string, isDone: boolean) => void
}

export const Task = ({ id, isDone, title, onChange }: PropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.currentTarget.checked)
  }

  return (
    <li>
      <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler} /> <span>{title}</span>
    </li>
  )
}
