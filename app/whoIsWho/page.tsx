'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardMedia, 
  Typography, 
  Container,
  Box,
  CardActions,
  IconButton,
  Modal,
  Paper
} from '@mui/material';
import { 
  ZoomIn,
  Download,
  Close
} from '@mui/icons-material';
import AppBarComponent from "@/components/appBar";
import { caricaturesData } from "@/data/imagesData";

interface CaricatureImage {
  name: string;
  src: string;
  size: string;
  features: number[];
}

export default function WhoIsWho() {
  const [images, setImages] = useState<CaricatureImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CaricatureImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const allImageData: CaricatureImage[] = caricaturesData.map(caricature => ({
      name: caricature.file.replace('.png', ''),
      src: `/caricatures/${caricature.file}`,
      size: 'Mediana',
      features: caricature.features
    }));

    setImages(allImageData);
  }, []);

  const handleDownload = (imageSrc: string, imageName: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenModal = (image: CaricatureImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <AppBarComponent />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Galería de Caricaturas
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Descubre todas las caricaturas del equipo
          </Typography>
          <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
            {images.length} caricaturas
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(6, 1fr)'
          },
          gap: 3,
          mt: 3
        }}>
          {images.map((image, index) => (
            <Card 
              key={index}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={image.src}
                alt={image.name}
                sx={{ 
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => handleOpenModal(image)}
              />
              <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                <IconButton 
                  onClick={() => handleOpenModal(image)}
                  size="small"
                  color="primary"
                >
                  <ZoomIn />
                </IconButton>
                <IconButton 
                  onClick={() => handleDownload(image.src, image.name)}
                  size="small"
                  color="primary"
                >
                  <Download />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        {images.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Cargando caricaturas...
            </Typography>
          </Box>
        )}
      </Container>

      
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Paper
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <Close />
          </IconButton>

          
          <Box
            component="img"
            src={selectedImage?.src}
            alt={selectedImage?.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />

          
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2,
            bgcolor: 'background.paper'
          }}>
            <IconButton
              onClick={() => selectedImage && handleDownload(selectedImage.src, selectedImage.name)}
              color="primary"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              <Download />
            </IconButton>
          </Box>
        </Paper>
      </Modal>
    </>
  );
} 