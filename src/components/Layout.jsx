import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Box 
        sx={{ 
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundImage: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
          color: 'white',
            py: 1.5,
            boxShadow: '0 6px 18px rgba(37,117,252,0.18)',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" fontWeight="bold">
            Picsum Gallery
          </Typography>
        </Container>
      </Box>

        

      <Container maxWidth="xl" sx={{ py: 2}}>
        <Outlet />
      </Container>
    </Box>
  );
}