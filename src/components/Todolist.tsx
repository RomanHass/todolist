import { TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'

type PropsType = {
  title: string
  tasks: TaskType[]
}

export const Todolist = ({ title, tasks }: PropsType) => {
  const tasksForTodolist = tasks.map(t => {
    return <Task key={t.id} isDone={t.isDone} title={t.title} />
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={'+'} />
      </div>
      <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
        {tasks.length === 0 ? <p>Тасок нет</p> : tasksForTodolist}
      </ul>
      <div>
        <Button title={'All'} />
        <Button title={'Active'} />
        <Button title={'Completed'} />
      </div>
    </div>
  )
}
