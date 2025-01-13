const theme = {
  palette: {
    primary: {
      main: '#002fff',
      contrastText: '#ffffff',
      dark: '#0021b4',
    },
    danger: {
      main: '#ff0000',
      contrastText: '#ffffff',
      dark: '#c50000',
    }
  }
}

export type Theme = typeof theme;
export type ThemePaletteColor = keyof Theme['palette'];
export default theme;