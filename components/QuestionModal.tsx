import { 
  Modal, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  IconButton 
} from '@mui/material';
import { 
  ArrowBack, 
  Cancel 
} from '@mui/icons-material';

interface Question {
  id: number;
  text: string;
  feature: number;
}

interface QuestionModalProps {
  open: boolean;
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (answer: boolean) => void;
  onPrevious: () => void;
  onCancel: () => void;
}

export default function QuestionModal({
  open,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  onPrevious,
  onCancel
}: QuestionModalProps) {
  return (
    <Modal
      open={open}
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
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
            sx={{
              visibility: currentQuestionIndex === 0 ? 'hidden' : 'visible',
              color: 'primary.main'
            }}
          >
            <ArrowBack />
          </IconButton>
          
          <Typography variant="body2" color="text.secondary">
            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
          </Typography>
          
          <IconButton
            onClick={onCancel}
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
              onClick={() => onAnswer(true)}
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
              onClick={() => onAnswer(false)}
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
  );
} 