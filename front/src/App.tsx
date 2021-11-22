import { ThemeProvider } from '@mui/material/styles';
import { theme } from './config/theme';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      Hi
    </ThemeProvider>
  );
};

export default App;
