import './App.css'
import { FilterValuesType, Todolist } from '../components/Todolist'
import { AddItemForm } from '../components/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { containerSx } from '../components/Todolist.styles'
import { NavButton } from '../components/NavButton'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Switch, Typography } from '@mui/material'
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from '../model/todolists-reducer'
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from '../model/tasks-reducer'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectTodolists } from '../model/todolists-selectors'
import { selectTasks } from '../model/tasks-selectors'
import { selectThemeMode } from './app-selectors'
import { changeThemeModeAC } from './app-reducer'
import { getTheme } from "../common/theme/theme.ts";

export const App = () => {
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)
  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
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

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }))
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth="lg" sx={containerSx}>
              <IconButton color="inherit">
                <MenuIcon/>
              </IconButton>
              <div>
                <Switch onChange={changeMode}/>
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
            <AddItemForm addItem={createTodolist}/>
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
                      updateTaskTitle={changeTaskTitle}
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
