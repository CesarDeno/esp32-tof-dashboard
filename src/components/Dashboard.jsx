import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Box, Alert, Container } from '@mui/material';

import DashboardHeader from './DashboardHeader';
import OccupancyCard from './OccupancyCard';
import HistoryTable from './HistoryTable';

export default function Dashboard({ mode, toggleColorMode }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

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
      
      <DashboardHeader 
        latestData={latestData} 
        mode={mode} 
        toggleColorMode={toggleColorMode} 
      />

      {/* Contenido Principal (Layout Dividido) */}
      <Container maxWidth={false} sx={{ mt: 3, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3, width: '100%', minHeight: 0 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, flexGrow: 1, minHeight: 0 }}>
          
          <OccupancyCard 
            latestData={latestData} 
            latestTimeStr={latestTimeStr} 
            isDark={isDark} 
          />

          <HistoryTable 
            history={history} 
            isDark={isDark} 
          />

        </Box>
      </Container>
      
    </Box>
  );
}
