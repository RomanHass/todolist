import { FilterValuesType, TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: number) => void
  changeFilter: (title: FilterValuesType) => void
}

export const Todolist = ({ title, tasks, removeTask, changeFilter }: PropsType) => {
  const tasksForTodolist = tasks.map(t => {
    return (
      <div style={{ display: 'flex' }}>
        <Task key={t.id} isDone={t.isDone} title={t.title} />
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
        <Button onClick={() => changeFilter('All')} title={'All'} />
        <Button onClick={() => changeFilter('Active')} title={'Active'} />
        <Button onClick={() => changeFilter('Completed')} title={'Completed'} />
      </div>
    </div>
  )
}
