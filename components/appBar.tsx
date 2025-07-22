import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function AppBarComponent() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar sx={{position: "static", height: '5.5em', maxWidth: '100%', backgroundColor: 'white', boxShadow: 'none'}}>
        <Container sx={{position: 'absolute', top: '1.375rem', left: '1.3125rem', height: '2.2386rem', width: '11.5625rem'}}>
            <a href="https://www.betterask.erni/" target="_blank" rel="noopener noreferrer">
                <img
                    alt="Ventana"
                    src="/erniLogo.png"
                    className="box-content w-full h-full"
                    style={{ cursor: 'pointer' }}
                />
            </a>
        </Container>
        hello
      </AppBar> 
    </Box>
  );
}
