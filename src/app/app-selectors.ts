import { RootState } from './strore.ts'
import { ThemeMode } from './app-reducer'

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
