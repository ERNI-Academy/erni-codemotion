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

interface CaricatureImage {
  name: string;
  src: string;
  size: string;
}

export default function WhoIsWho() {
  const [images, setImages] = useState<CaricatureImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<CaricatureImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const imageFiles = [
      '04bt8fcpmxrmc0cpxkyrn51zz8.png', '1747811736936.png', '1747812170417.png',
      '1747812515340.png', '1747812965698.png', '1747814627050.png',
      '1747815898025.png', '1747816313058.png', '1747817335205.png',
      '1747817597730.png', '1747817795975.png', '1747818270793.png',
      '1747818617803.png', '1747818751320.png', '1747819129585.png',
      '1747819328846.png', '1747820348338.png', '1747820817635.png',
      '1747821176441.png', '1747821608234.png', '1747821809116.png',
      '1747822000042.png', '1747822222760.png', '1747822417009.png',
      '1747822624858.png', '1747822856476.png', '1747823055525.png',
      '1747823297507.png', '1747823548506.png', '1747823873202.png',
      '1747824184513.png', '1747824382595.png', '1747824582931.png',
      '1747824795782.png', '1747825179754.png', '1747825801213.png',
      '1747826034943.png', '1747826273155.png', '1747826734381.png',
      '1747826960041.png', '1747827163941.png', '1747827610390.png',
      '1747827887133.png', '1747828222539.png', '1747828498773.png',
      '1747828715283.png', '1747829103639.png', '1747829286464.png',
      '1747829607099.png', '1747833524985.png', '1747833962055.png',
      '1747834834230.png', '1747835683446.png', '1747835906472.png',
      '1747836238089.png', '1747836490288.png', '1747836694426.png',
      '1747837417570.png', '1747837680213.png', '1747837942954.png',
      '1747838181108.png', '1747838370148.png', '1747838610075.png',
      '1747838820179.png', '1747839027196.png', '19jsg3h45xrme0cpxjhvd0qsp4.png',
      '1akcje1ky5rmc0cpx8ba3bcy9r.png', '1qv04bem0nrmc0cpxmer6817ww.png',
      '1w2qkckawsrma0cpxkwvs6n5kc.png', '242wzrkn4drmc0cpxpab07pmjm.png',
      '2bq79j3rs9rma0cpx69snrwrbr.png', '31gk174fh1rmc0cpxnpvccx5wm.png',
      '33yd5e87m1rma0cpxr5rpt4mxc.png', '38f93m7z4hrma0cpx8rsd84z68.png',
      '3jv0z78xh1rm80cpxqprptgbm4.png', '46c9t09jqnrme0cpxrvacgynww.png',
      '4ayk6b5e7srmc0cpxktvxv6qx8.png', '4hfjtndjs5rmc0cpx6v8cg3jqm.png',
      '5x9b7sy8b9rm80cpx6zb4ks7z8.png', '6dtkzrz24drme0cpxkhbebw87c.png',
      '6ejb1yyfwsrmc0cpxryvkrg03r.png', '77j5m7smm9rme0cpxj3rf4xeg0.png',
      '78gy7crs0drm80cpxjktwn8xeg.png', '7hq8cx45tdrme0cpxk0t9zz7mc.png',
      '7tk0cw4541rmc0cpxska0pb6q8.png', '7yd8vy05t5rmc0cpxqxt0e99f8.png',
      '802q0fn9s1rmc0cpx6s80fvvc4.png', '815vzvycesrm80cpxp1tk610q0.png',
      '8hjyegst95rma0cpxmhrpqd6rc.png', '8zya81hgksrm80cpx6595z364r.png',
      '96bty29x6srma0cpxrqa22yg30.png', '9cr2p407t5rm80cpxrwr08pez8.png',
      '9gdkf62dfnrm80cpxqj9zg91f0.png', 'ajr1qa5bb1rmc0cpxkjv81xe4g.png',
      'ALEX.png', 'ALMUDENA.png', 'ANGELA.png', 'bdwed3k869rme0cpxrbv4emccw.png',
      'CARMEN.png', 'ckmb5hgzc5rm80cpx6gtmfjw98.png', 'cw2y9sfq39rm80cpxknvjjk2km.png',
      'd8aee77dh1rme0cpxscb12sn3g.png', 'daga0yg83nrma0cpxntb6862rc.png',
      'DANIELA.png', 'DIEGO.png', 'e0myxex2pnrmc0cpxaetv8068m.png',
      'e1zr0jcwcdrme0cpxn5a37eyec.png', 'eewcct0d0drmc0cpxmwv9hpv3m.png',
      'egegdrrpq5rme0cpx6k9a0yhww.png', 'ELENA.png', 'ELENA2.png', 'ELLA.png',
      'ERNI.png', 'ESTHER.png', 'f6xm91vradrme0cpxjybecsm30.png',
      'fd7c00x031rmc0cpxs6s6s0jsw.png', 'ff1yfydx4nrma0cpxn9td0b3bg.png',
      'FULGENCIO.png', 'ga00qy8wdsrme0cpxrhap0tcww.png', 'gdqr9pgkfsrmc0cpxs1s2pdcd0.png',
      'gptwrf1f2xrmc0cpxnztv8kgfr.png', 'gynjvnym15rma0cpx6c8s786mr.png',
      'h1e3x9b7pnrma0cpxjt9h6qkkw.png', 'hnrpjawbgdrm80cpxrs91xd8xw.png',
      'hv2y0bv1vhrme0cpxkcvc8mwk0.png', 'JEEZ.png', 'JUAN.png', 'LAURA.png',
      'LOS FULGENCIOS.png', 'LUCY.png', 'm6d3hzzmkxrmc0cpxmb9hh5nrr.png',
      'MARU.png', 'MATHEO.png', 'NADIA.png', 'NEREA.png', 'None.png',
      'NURIA.png', 'NURIA2.png', 'nvvrknrxesrm80cpxmqb8dc3jg.png', 'PABLO.png',
      'PAM.png', 'PAO.png', 'pmtbx37jy1rmc0cpxk9r5m9f78.png',
      'pvth2vf2e1rma0cpxs8vm70bjm.png', 'pwg3b8f6wdrm80cpxjvs83zkh8.png',
      'rrx2r2pradrmc0cpxn2bk0949c.png', 'RUT.png', 's0t51y7dvnrma0cpxs5r1fnse8.png',
      's8ga514eb9rme0cpxqka8kb77c.png', 'SARAH.png', 'SASHA.png',
      'sedcfhkk1nrme0cpxr2vd8v03g.png', 'sepph7j8fxrma0cpxk38f4hwzr.png',
      'sx7skfjnehrm80cpxp0s9s2xar.png', 'vdv041rr4nrm80cpxkrabr5wgm.png',
      'vr5vydc6g5rm80cpx728d2nhzw.png', 'vvtbqjxd1srma0cpxjrrja74mm.png',
      'w1tywy9cpxrma0cpxjea84nprc.png', 'wa5b28mvcdrmc0cpx8gtjct7xg.png',
      'w7abkkk0dsrmc0cpx2wswexx8m.png', 'wqxc3j6nydrme0cpxk5b7k1ha4.png',
      'x99crfy5e5rma0cpxmyb1pmv2m.png', 'xsprt3rad5rmc0cpxahsdvh3km.png',
      'y0nz91v9znrme0cpxj9r5tmbp0.png', 'y92scw8e95rma0cpxqnse2kf80.png',
      'yap5sv81zxrme0cpxraa2g526m.png', 'yawq0gqxh9rm80cpxp5tr41dec.png',
      'ybjrw7z16hrme0cpxrdt628n7c.png'
    ];

    const imageData: CaricatureImage[] = imageFiles.map(filename => ({
      name: filename.replace('.png', ''),
      src: `/caricatures/${filename}`,
      size: filename.includes('MB') ? 'Grande' : filename.includes('KB') ? 'Mediana' : 'Pequeña'
    }));

    setImages(imageData);
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

      {/* Modal para mostrar la imagen en tamaño completo */}
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
          {/* Botón de cerrar */}
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

          {/* Imagen */}
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

          {/* Botones de acción */}
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