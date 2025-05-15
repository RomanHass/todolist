import { createTheme } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import type { ThemeMode } from '@/app/app-reducer.ts';

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
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
};

