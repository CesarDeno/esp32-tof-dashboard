import { useState } from 'react';
import { 
  Paper, Box, Typography, Chip, useTheme,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function HistoryTable({ history, isDark }) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (_event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
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
              <TableCell align="center" sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Dispositivo</Typography></TableCell>
              <TableCell align="center" sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Acción</Typography></TableCell>
              <TableCell align="center" sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Total Personas</Typography></TableCell>
              <TableCell sx={{ bgcolor: theme.palette.background.paper }}><Typography variant="subtitle2" color="text.secondary">Hora</Typography></TableCell>
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
                  <TableCell align="center" sx={{ py: 1.5 }}>{record.deviceID ?? '--'}</TableCell>
                  <TableCell align="center" sx={{ py: 1.5 }}>
                    <Typography variant="body2" fontWeight="bold" color={record.action === 'IN' ? 'success.main' : record.action === 'OUT' ? 'error.main' : 'text.primary'}>
                      {record.action ?? '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ py: 1.5 }}>{record.currentPersonCount ?? '--'}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{timeStr}</TableCell>
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
  );
}
