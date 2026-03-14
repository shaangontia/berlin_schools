import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import AppLayout from './components/AppLayout';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout />
    </ThemeProvider>
  );
}
