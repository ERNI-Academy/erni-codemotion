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
  Paper,
  Button,
  Fade,
  Slide,
  Fab
} from '@mui/material';
import { 
  ZoomIn,
  Download,
  Close,
  ArrowBack,
  Cancel,
  Refresh
} from '@mui/icons-material';
import AppBarComponent from "@/components/appBar";
import { caricaturesData, CaricatureFeatures } from "@/data/imagesData";

interface CaricatureImage {
  name: string;
  src: string;
  size: string;
  features: number[];
}

interface Question {
  id: number;
  text: string;
  feature: CaricatureFeatures;
}

const questions: Question[] = [
  { id: 1, text: "¿Tu caricatura tiene gafas?", feature: CaricatureFeatures.GLASSES },
  { id: 2, text: "¿Tu caricatura tiene barba?", feature: CaricatureFeatures.BEARD },
  { id: 3, text: "¿Tu caricatura tiene el pelo largo?", feature: CaricatureFeatures.LONG_AIR },
  { id: 4, text: "¿Eres un hombre?", feature: CaricatureFeatures.MAN }
];

export default function WhoIsWho() {
  const [images, setImages] = useState<CaricatureImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<CaricatureImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CaricatureImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const allImageData: CaricatureImage[] = caricaturesData.map(caricature => ({
      name: caricature.file.replace('.png', ''),
      src: `/caricatures/${caricature.file}`,
      size: 'Mediana',
      features: caricature.features
    }));

    setImages(allImageData);
    setFilteredImages(allImageData);
  }, []);

  useEffect(() => {
    // Mostrar el primer modal de pregunta después de cargar las imágenes
    if (images.length > 0) {
      setTimeout(() => {
        setQuestionModalOpen(true);
      }, 1000);
    }
  }, [images]);

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

  const filterImagesBySequence = (answers: boolean[]): CaricatureImage[] => {
    return images.filter(image => {
      // Verificar que la imagen tenga la secuencia de respuestas
      for (let i = 0; i < answers.length; i++) {
        const expectedValue = answers[i] ? 1 : 0;
        if (image.features[i] !== expectedValue) {
          return false;
        }
      }
      return true;
    });
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    // Aplicar filtro incremental
    setIsFiltering(true);
    
    setTimeout(() => {
      const filtered = filterImagesBySequence(newAnswers);
      setFilteredImages(filtered);
      setIsFiltering(false);
      
      // Pasar a la siguiente pregunta o cerrar modales
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuestionModalOpen(false);
      }
    }, 300);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newAnswers = answers.slice(0, -1);
      setAnswers(newAnswers);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Recalcular filtros
      setIsFiltering(true);
      setTimeout(() => {
        const filtered = filterImagesBySequence(newAnswers);
        setFilteredImages(filtered);
        setIsFiltering(false);
      }, 300);
    }
  };

  const handleCancelQuestions = () => {
    setQuestionModalOpen(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFilteredImages(images);
  };

  const handleResetFilters = () => {
    setQuestionModalOpen(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFilteredImages(images);
  };

  const handleRestartSequence = () => {
    setQuestionModalOpen(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setFilteredImages(images);
    
    // Reiniciar la secuencia de modales después de un breve delay
    setTimeout(() => {
      setQuestionModalOpen(true);
    }, 300);
  };

  const currentQuestion = questions[currentQuestionIndex];

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
            Quién es quién
          </Typography>
          <Button
            variant="text"
            onClick={handleRestartSequence}
            sx={{
              color: 'text.secondary',
              fontSize: '1.25rem',
              fontWeight: 400,
              textTransform: 'none',
              p: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                color: 'primary.main'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Encuentra tu caricatura
          </Button>
          <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
            {filteredImages.length} caricaturas
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
          {filteredImages.map((image, index) => (
            <Fade 
              key={image.name} 
              in={!isFiltering} 
              timeout={300}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Slide 
                direction="up" 
                in={!isFiltering} 
                timeout={300}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Card 
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
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {image.name}
                    </Typography>
                    <CardActions sx={{ justifyContent: 'center', p: 0 }}>
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
                  </Box>
                </Card>
              </Slide>
            </Fade>
          ))}
        </Box>

        {filteredImages.length === 0 && !isFiltering && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron caricaturas con esas características
            </Typography>
          </Box>
        )}

        {isFiltering && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Filtrando caricaturas...
            </Typography>
          </Box>
        )}
      </Container>

      {/* Botón flotante para resetear filtros */}
      {answers.length > 0 && (
        <Fab
          color="primary"
          aria-label="reset filters"
          onClick={handleResetFilters}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            '&:hover': {
              boxShadow: '0 6px 25px rgba(0,0,0,0.2)'
            }
          }}
        >
          <Refresh />
        </Fab>
      )}

      {/* Modal de preguntas */}
      <Modal
        open={questionModalOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'transparent'
        }}
      >
        <Paper
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            width: { xs: '95%', sm: '400px' },
            outline: 'none',
            bgcolor: 'background.paper',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          {/* Header con botones de navegación */}
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <IconButton
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              sx={{
                visibility: currentQuestionIndex === 0 ? 'hidden' : 'visible',
                color: 'primary.main'
              }}
            >
              <ArrowBack />
            </IconButton>
            
            <Typography variant="body2" color="text.secondary">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </Typography>
            
            <IconButton
              onClick={handleCancelQuestions}
              color="error"
            >
              <Cancel />
            </IconButton>
          </Box>

          {/* Contenido del modal */}
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 4,
                color: 'text.primary'
              }}
            >
              {currentQuestion.text}
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => handleAnswer(true)}
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2
                }}
              >
                Sí
              </Button>
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={() => handleAnswer(false)}
                sx={{
                  minWidth: { xs: '100%', sm: '120px' },
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 2
                }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>

      {/* Modal de imagen seleccionada */}
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