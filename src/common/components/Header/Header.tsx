import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Switch } from '@mui/material'
import { NavButton } from '@/common/components/NavButton/NavButton.ts'
import { changeThemeModeAC } from '@/app/app-reducer.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { useAppSelector } from '@/common/hooks/useAppSelector.ts'
import { selectThemeMode } from '@/app/app-selectors.ts'
import { getTheme } from '@/common/theme/theme.ts'
import { containerSx } from '@/common/styles/container.style.ts'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }

  return (
    <>
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
    </>
  );
};

