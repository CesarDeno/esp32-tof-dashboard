import { AppBar, Toolbar, Box, Typography, IconButton, useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function DashboardHeader({ latestData, mode, toggleColorMode }) {
  const theme = useTheme();
  const isDark = mode === 'dark';

  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ width: '100%', borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img src={`${import.meta.env.BASE_URL}favicon.ico`} alt="Logo" style={{ width: '32px', height: '32px' }} />
          <Typography variant="h6" component="h1" color="text.primary" sx={{ fontWeight: 400, letterSpacing: 0, textTransform: 'none', display: { xs: 'none', sm: 'block' } }}>
            Monitoreo IoT | Sensores ToF en Tiempo Real
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box 
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.5, borderRadius: 5,
              bgcolor: latestData?.deviceID ? (isDark ? "rgba(52, 168, 83, 0.1)" : "#e6f4ea") : (isDark ? "rgba(234, 67, 53, 0.1)" : "#fce8e6"),
              border: `1px solid ${latestData?.deviceID ? (isDark ? 'rgba(52, 168, 83, 0.2)' : '#ceead6') : (isDark ? 'rgba(234, 67, 53, 0.2)' : '#fad2cf')}`
            }}
          >
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
              Disp: <Box component="span" fontWeight="700" sx={{ color: theme.palette.text.primary }}>{latestData?.deviceID || 'Ninguno'}</Box>
            </Typography>
            <Box sx={{ width: '1px', height: '12px', bgcolor: theme.palette.divider, mx: 0.5 }} />
            <FiberManualRecordIcon sx={{ fontSize: 12, color: latestData?.deviceID ? theme.palette.secondary.main : 'error.main', animation: latestData?.deviceID ? 'pulse 1.5s infinite' : 'none' }} />
            <Typography variant="caption" sx={{ color: latestData?.deviceID ? theme.palette.secondary.main : 'error.main', fontWeight: 600, letterSpacing: 0.5 }}>
              {latestData?.deviceID ? 'LIVE' : 'DISCONNECTED'}
            </Typography>
          </Box>
          <IconButton onClick={toggleColorMode} color="inherit" size="large">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
