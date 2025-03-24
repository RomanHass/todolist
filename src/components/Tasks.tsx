import { ChangeEvent } from 'react'
import { TaskType } from '../App'

type PropsType = TaskType & {
  onChange: (taskId: string, isDone: boolean) => void
  className: string
}

export const Task = ({ id, isDone, title, onChange, className }: PropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.currentTarget.checked)
  }

  return (
    <li>
      <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler} />
      <span className={className}>{title}</span>
    </li>
  )
}
