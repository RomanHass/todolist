import { ChangeEvent } from 'react'
import { TaskType } from '../App'
import { EditableSpan } from './EditableSpan'

type PropsType = TaskType & {
  className: string
  todolistId: string
  onChange: (todolistId: string, taskId: string, isDone: boolean) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = ({ todolistId, id, isDone, title, className, onChange, updateTaskTitle }: PropsType) => {
  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(todolistId, id, e.currentTarget.checked)
  }

  const updateTaskTitleHandler = (title: string) => {
    updateTaskTitle(todolistId, id, title)
  }

  return (
    <li>
      <input type="checkbox" checked={isDone} onChange={onChangeTaskStatusHandler} />
      <EditableSpan className={className} oldTitle={title} updateTaskTitle={updateTaskTitleHandler} />
    </li>
  )
}
