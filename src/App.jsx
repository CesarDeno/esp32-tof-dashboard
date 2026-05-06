import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1a73e8' }, // Google Blue
                secondary: { main: '#34a853' }, // Google Green
                background: { default: '#f8f9fa', paper: '#ffffff' },
                text: { primary: '#202124', secondary: '#5f6368' },
                divider: '#e0e0e0',
              }
            : {
                primary: { main: '#8ab4f8' },
                secondary: { main: '#81c995' },
                background: { default: '#202124', paper: '#292a2d' },
                text: { primary: '#e8eaed', secondary: '#9aa0a6' },
                divider: '#3c4043',
              }),
        },
        typography: {
          fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: { fontWeight: 600 },
          h5: { fontWeight: 500 },
          h6: { fontWeight: 500 },
          subtitle1: { fontWeight: 500 },
          subtitle2: { fontWeight: 500 },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' ? '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)' : 'none',
                border: mode === 'dark' ? '1px solid #3c4043' : 'none',
              }
            }
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' ? '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)' : 'none',
                border: mode === 'dark' ? '1px solid #3c4043' : 'none',
              }
            }
          }
        }
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard mode={mode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  );
}

export default App;
