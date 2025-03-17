type PropsType = {
  title: string
  isDone: boolean
}

export const Task = ({ isDone, title }: PropsType) => {
  return (
    <li>
      <input type="checkbox" checked={isDone} /> <span>{title}</span>
    </li>
  )
}
