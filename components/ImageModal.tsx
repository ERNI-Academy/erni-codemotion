import { 
  Modal, 
  Paper, 
  Box, 
  IconButton 
} from '@mui/material';
import { 
  Close, 
  Download 
} from '@mui/icons-material';

interface ImageModalProps {
  open: boolean;
  selectedImage: {
    src: string;
    name: string;
  } | null;
  onClose: () => void;
  onDownload: (imageSrc: string, imageName: string) => void;
}

export default function ImageModal({
  open,
  selectedImage,
  onClose,
  onDownload
}: ImageModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          onClick={onClose}
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
            onClick={() => selectedImage && onDownload(selectedImage.src, selectedImage.name)}
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
  );
} 