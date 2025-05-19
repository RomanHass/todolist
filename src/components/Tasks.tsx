import { List, Typography } from '@mui/material';
import { TaskItem } from '@/components/Task.tsx';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectTasks } from '@/model/tasks-selectors.ts';
import type { Todolist } from '@/model/todolists-reducer.ts';

export const Tasks = ({ todolist }: Props) => {
  const { id: todolistId, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[todolistId]

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
      {filteredTasks.length === 0
        ? <Typography variant={'inherit'}>Тасок нет</Typography>
        : filteredTasks.map(t => {
          return (
            <TaskItem
              key={t.id}
              task={t}
              todolistId={todolistId}
            />
          )
        })}
    </List>
  )
}

type Props = {
  todolist: Todolist
}