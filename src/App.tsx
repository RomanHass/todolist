import { useState } from 'react'
import './App.css'
import { FilterValuesType, Todolist } from './components/Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { containerSx } from './components/Todolist.styles'
import { NavButton } from './components/NavButton'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = Record<string, TaskType[]>

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const addTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: TodolistType = { id: todolistId, title, filter: 'all' }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [todolistId]: [] })
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const updateTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl)))
  }

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
  }

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = { id: v1(), title, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone } : t)) })
  }

  const changeTodolistFilter = (todolistId: string, newFilterValue: FilterValuesType) => {
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: newFilterValue } : tl)))
  }

  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? { ...t, title } : t)) })
  }

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="lg" sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={'dodgerblue'}>Faq</NavButton>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container alignItems={'center'} sx={{ p: '20px 0' }}>
          <h3>Добавить тудулист:</h3>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {todolists.map(tl => {
            let tasksForTodolist = tasks[tl.id]
            return (
              <Grid>
                <Paper elevation={5} sx={{ p: '15px' }}>
                  <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTodolistTitle={updateTodolistTitle}
                    removeTask={removeTask}
                    addItem={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTodolistFilter={changeTodolistFilter}
                    updateTaskTitle={updateTaskTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default App
