import { Button } from './Button'
import { Task } from './Tasks'

type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
}

export const Todolist = ({ title, tasks }: PropsType) => {
  const tasksForTodolist = tasks.map(t => {
    return <Task isDone={t.isDone} title={t.title} />
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={'+'} />
      </div>
      <ul>{tasksForTodolist}</ul>
      <div>
        <Button title={'All'} />
        <Button title={'Active'} />
        <Button title={'Completed'} />
      </div>
    </div>
  )
}
