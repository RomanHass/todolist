import { List } from '@mui/material';
import { deleteTaskAC } from '@/model/tasks-reducer.ts';
import { Task } from '@/components/Task.tsx';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import type { Todolist } from '@/model/todolists-reducer.ts';

export const Tasks = ({ todolist }: Props) => {
  const {id: todolistId, filter} = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  let todolistTasks = tasks[todolistId]

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed': {
        return todolistTasks.filter(t => t.isDone)
      }
      case 'active': {
        return todolistTasks.filter(t => !t.isDone)
      }
      default:
        return todolistTasks
    }
  }

  let filteredTasks = getFilteredTasks()

  return (
    <List>
      {filteredTasks.map(t => {
        const deleteTaskHandler = () => {
          dispatch(deleteTaskAC({ todolistId, taskId: t.id }))
        }

        return (
          <Task
            key={t.id}
            id={t.id}
            todolistId={todolistId}
            isDone={t.isDone}
            title={t.title}
            deleteTask={deleteTaskHandler}
          />
        )
      })}
    </List>
  )
}

type Props = {
  todolist: Todolist
}