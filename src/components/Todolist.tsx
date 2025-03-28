import { TaskType } from '../App'
import { Button } from './Button'
import { Task } from './Tasks'
import { AddItemForm } from './AddItemForm'

export type FilterValuesType = 'all' | 'active' | 'completed'

type PropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  addItem: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTodolistFilter: (todolistId: string, newFilterValue: FilterValuesType) => void
}

export const Todolist = ({
  todolistId,
  title,
  tasks,
  filter,
  removeTodolist,
  removeTask,
  addItem,
  changeTaskStatus,
  changeTodolistFilter,
}: PropsType) => {
  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const changeTaskStatusHandler = (todolistId: string, taskId: string, isDone: boolean) => {
    changeTaskStatus(todolistId, taskId, isDone)
  }

  const addTaskHandler = (title: string) => {
    addItem(todolistId, title)
  }

  const changeFilterHandler = (newFilerValue: FilterValuesType) => {
    changeTodolistFilter(todolistId, newFilerValue)
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed': {
        return tasks.filter(t => t.isDone)
      }
      case 'active': {
        return tasks.filter(t => !t.isDone)
      }
      default:
        return tasks
    }
  }

  let filteredTasks = getFilteredTasks()

  const tasksForTodolist = filteredTasks.map(t => {
    const removeTaskHandler = () => {
      removeTask(todolistId, t.id)
    }

    return (
      <div key={t.id} style={{ display: 'flex' }}>
        <Task
          className={t.isDone ? 'is-done' : ''}
          id={t.id}
          todolistId={todolistId}
          isDone={t.isDone}
          title={t.title}
          onChange={changeTaskStatusHandler}
        />
        <Button onClick={removeTaskHandler} title={'x'} />
      </div>
    )
  })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', columnGap: '10px' }}>
        <h3>{title}</h3>
        <Button onClick={removeTodolistHandler} title={'x'} />
      </div>
      <AddItemForm addItem={addTaskHandler} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>{tasksForTodolist}</ul>
      )}
      <div>
        <Button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('all')}
          title={'All'}
        />
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('active')}
          title={'Active'}
        />
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('completed')}
          title={'Completed'}
        />
      </div>
    </div>
  )
}
