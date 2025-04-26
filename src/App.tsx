import { useState } from 'react'
import './App.css'
import { FilterValuesType, Todolist } from './components/Todolist'
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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Switch, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import {
  createTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  updateTodolistTitleAC,
  TodolistType,
} from './model/todolists-reducer'
import { changeTaskStatusAC, createTaskAC, deleteTaskAC, updateTaskTitleAC } from './model/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './app/strore'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = Record<string, TaskType[]>

export const App = () => {
  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId))
  }

  const updateTodolistTitle = (todolistId: string, title: string) => {
    dispatch(updateTodolistTitleAC({ id: todolistId, title }))
  }

  const changeTodolistFilter = (todolistId: string, newFilterValue: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, newFilterValue }))
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({ todolistId, taskId }))
  }

  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC({ todolistId, title }))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }))
  }

  const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(updateTaskTitleAC({ todolistId, taskId, title }))
  }

  type ThemeMode = 'light' | 'dark'

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const changeMode = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: indigo[400],
      },
      secondary: {
        main: indigo[700],
      },
    },
  })

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth="lg" sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <Switch onChange={changeMode} />
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.info.light}>Faq</NavButton>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid container alignItems={'center'} sx={{ p: '20px 0' }} columnGap={'10px'}>
            <Typography variant={'h6'} fontWeight={700}>
              Добавить тудулист:
            </Typography>
            <AddItemForm addItem={createTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists?.map(tl => {
              let tasksForTodolist = tasks[tl.id]
              return (
                <Grid key={tl.id}>
                  <Paper elevation={5} sx={{ p: '15px' }}>
                    <Todolist
                      todolistId={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      filter={tl.filter}
                      deleteTodolist={deleteTodolist}
                      updateTodolistTitle={updateTodolistTitle}
                      deleteTask={deleteTask}
                      addItem={createTask}
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
      </ThemeProvider>
    </div>
  )
}

export default App
