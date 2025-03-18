import { TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: number) => void
}

export const Todolist = ({ title, tasks, removeTask }: PropsType) => {
  // const removeTaskHandler = (id: number) => {
  //   removeTask(id)
  // }

  const tasksForTodolist = tasks.map(t => {
    return (
      <div style={{ display: 'flex' }}>
        <Task key={t.id} isDone={t.isDone} title={t.title} />
        {/* <Button onClick={removeTaskHandler} title={'x'} /> */}
        <Button onClick={() => removeTask(t.id)} title={'x'} />
      </div>
    )
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
