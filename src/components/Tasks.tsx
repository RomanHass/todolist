import { ChangeEvent } from 'react'
import { TaskType } from '../App'

type PropsType = TaskType & {
  onChange: (todolistId: string, taskId: string, isDone: boolean) => void
  className: string
  todolistId: string
}

export const Task = ({ todolistId, id, isDone, title, onChange, className }: PropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(todolistId, id, e.currentTarget.checked)
  }

  return (
    <li>
      <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler} />
      <span className={className}>{title}</span>
    </li>
  )
}
