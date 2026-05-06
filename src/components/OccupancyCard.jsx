import { Paper, Box, Typography, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function OccupancyCard({ latestData, latestTimeStr, isDark }) {
  const theme = useTheme();

  return (
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
  );
}
