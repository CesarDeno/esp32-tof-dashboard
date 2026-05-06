import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import {
  Box, Typography, Paper, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  AppBar, Toolbar, IconButton, Container, useTheme, Chip
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PeopleIcon from '@mui/icons-material/People';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function Dashboard({ mode, toggleColorMode }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();

  const handleChangePage = (_event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const q = query(collection(db, 'monitoreo'), orderBy('timestamp', 'desc'), limit(50));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(records);
    }, (err) => {
      console.error(err);
      setError('Error al conectar con Firestore. Verifica reglas de seguridad.');
    });

    return () => unsubscribe();
  }, []);

  const latestData = history.length > 0 ? history[0] : null;
  let latestTimeStr = '--';
  if (latestData?.timestamp) {
    const d = typeof latestData.timestamp.toDate === 'function' ? latestData.timestamp.toDate() : new Date(latestData.timestamp);
    latestTimeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  const isDark = mode === 'dark';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: { xs: 'auto', lg: '100vh' }, overflow: { xs: 'auto', lg: 'hidden' }, width: '100%', flexGrow: 1, bgcolor: 'background.default' }}>
      
      {/* AppBar */}
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

      {/* Contenido Principal (Layout Dividido) */}
      <Container maxWidth={false} sx={{ mt: 3, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3, width: '100%', minHeight: 0 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, flexGrow: 1, minHeight: 0 }}>
          
          {/* Columna Izquierda: Conteo Principal */}
          <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: { xs: 3, md: 4 }, bgcolor: 'background.paper', minHeight: 0 }}>
            <Box sx={{ p: { xs: 2, md: 3 }, borderRadius: '50%', bgcolor: isDark ? 'rgba(52, 168, 83, 0.1)' : '#e6f4ea', color: theme.palette.success.main, mb: { xs: 2, md: 4 } }}>
              <PeopleIcon sx={{ fontSize: { xs: 48, md: 80 } }} />
            </Box>
            <Typography variant="h4" color="text.secondary" sx={{ fontWeight: 400, mb: { xs: 1, md: 2 }, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Ocupación Actual
            </Typography>
            <Typography variant="h1" color="text.primary" sx={{ fontWeight: 700, fontSize: { xs: '8rem', md: '10rem', lg: '14rem' }, lineHeight: 1 }}>
              {latestData?.currentPersonCount ?? '--'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10, color: 'success.main' }} />
              Último registro: {latestTimeStr}
            </Typography>
          </Paper>

          {/* Columna Derecha: Tabla */}
          <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100%', minHeight: 0 }}>
            <Box 
              p={3} pb={2} 
              borderBottom={`1px solid ${theme.palette.divider}`}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: isDark ? 'linear-gradient(90deg, rgba(25,118,210,0.08) 0%, transparent 100%)' : 'linear-gradient(90deg, rgba(25,118,210,0.04) 0%, transparent 100%)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: 2, 
                  bgcolor: isDark ? 'rgba(25,118,210,0.15)' : 'rgba(25,118,210,0.08)',
                  display: 'flex',
                  color: 'primary.main'
                }}>
                  <TimelineIcon fontSize="small" />
                </Box>
                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, letterSpacing: '-0.5px' }}>
                  Historial de Movimientos
                </Typography>
              </Box>
              <Chip 
                label={`${history.length} Registros`} 
                size="small" 
                sx={{ 
                  fontWeight: 600, 
                  bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                  color: 'text.secondary',
                  borderRadius: 1.5,
                  border: `1px solid ${theme.palette.divider}`
                }} 
              />
            </Box>
            <TableContainer sx={{ flexGrow: 1, overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Hora</Typography></TableCell>
                    <TableCell align="center" sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Dispositivo</Typography></TableCell>
                    <TableCell align="center" sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Acción</Typography></TableCell>
                    <TableCell align="center" sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Total Personas</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(record => {
                    let timeStr = '--';
                    if (record.timestamp) {
                      const d = typeof record.timestamp.toDate === 'function' ? record.timestamp.toDate() : new Date(record.timestamp);
                      timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    }
                    return (
                      <TableRow key={record.id} hover>
                        <TableCell sx={{ py: 1.5 }}>{timeStr}</TableCell>
                        <TableCell align="center" sx={{ py: 1.5 }}>{record.deviceID ?? '--'}</TableCell>
                        <TableCell align="center" sx={{ py: 1.5 }}>
                          <Typography variant="body2" fontWeight="bold" color={record.action === 'IN' ? 'success.main' : record.action === 'OUT' ? 'error.main' : 'text.primary'}>
                            {record.action ?? '--'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1.5 }}>{record.currentPersonCount ?? '--'}</TableCell>
                      </TableRow>
                    );
                  })}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 3, color: 'text.secondary' }}>Esperando datos...</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[15]}
              component="div"
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas:"
            />
          </Paper>

        </Box>
      </Container>
      
    </Box>
  );
}
