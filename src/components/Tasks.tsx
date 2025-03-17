import { TaskType } from '../App'

type PropsType = Omit<TaskType, 'id'>

export const Task = ({ isDone, title }: PropsType) => {
  return (
    <li>
      <input type="checkbox" checked={isDone} /> <span>{title}</span>
    </li>
  )
}
