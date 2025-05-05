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
  changeTodolistTitleAC,
} from './model/todolists-reducer'
import { changeTaskStatusAC, createTaskAC, deleteTaskAC, updateTaskTitleAC } from './model/tasks-reducer'
import { useAppDispatch } from './app/common/hooks/useAppDispatch'
import { useAppSelector } from './app/common/hooks/useAppSelector'
import { selectTodolists } from './model/todolists-selectors'
import { selectTasks } from './model/tasks-selectors'

type ThemeMode = 'light' | 'dark'

export const App = () => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

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

  const changeMode = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
  }

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title))
  }

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }))
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
                      changeTodolistTitle={changeTodolistTitle}
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
