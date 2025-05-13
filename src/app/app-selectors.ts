import { RootState } from '../app/strore'
import { ThemeMode } from './app-reducer'

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
