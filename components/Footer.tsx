import { Box, Typography, Container, IconButton } from '@mui/material';
import { 
  LinkedIn, 
  Instagram, 
  YouTube, 
  Facebook, 
  X 
} from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#033778',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Copyright a la izquierda */}
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'var(--font-source-sans-pro), sans-serif',
              fontWeight: 400
            }}
          >
            © 2024 ERNI. Todos los derechos reservados.
          </Typography>

          {/* Follow us y iconos a la derecha */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--font-source-sans-pro), sans-serif',
                fontWeight: 400,
                mr: 1
              }}
            >
              Follow us
            </Typography>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Instagram fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <YouTube fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <X fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 