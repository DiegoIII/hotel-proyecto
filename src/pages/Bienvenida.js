import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Restaurant,
  Pool,
  Spa,
  FitnessCenter,
  LocalBar,
  Wifi,
  Star,
  LocationOn,
  Phone,
  Email,
  CleaningServices,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const images = [
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Vista del hotel",
    title: "Vista panorámica",
  },
  {
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Habitación",
    title: "Suite Premium",
  },
  {
    url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
    alt: "Piscina",
    title: "Piscina infinity",
  },
  {
    url: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1931&q=80",
    alt: "Restaurante",
    title: "Restaurante gourmet",
  },
];

const servicios = [
  {
    icon: <Restaurant sx={{ fontSize: 32, color: "#F26522" }} />,
    titulo: "Restaurante",
    descripcion: "Gastronomía internacional",
  },
  {
    icon: <Pool sx={{ fontSize: 32, color: "#F26522" }} />,
    titulo: "Piscina",
    descripcion: "Vista panorámica al océano",
  },
  {
    icon: <Spa sx={{ fontSize: 32, color: "#F26522" }} />,
    titulo: "Spa",
    descripcion: "Tratamientos relajantes",
  },
  {
    icon: <FitnessCenter sx={{ fontSize: 32, color: "#F26522" }} />,
    titulo: "Gimnasio",
    descripcion: "Equipos modernos",
  },
  {
    icon: <LocalBar sx={{ fontSize: 32, color: "#F26522" }} />,
    titulo: "Bar",
    descripcion: "Cócteles artesanales",
  },
  {
    icon: <Wifi sx={{ fontSize: 32, color: "#F26522" }} />,
    titulo: "WiFi",
    descripcion: "Conexión de alta velocidad",
  },
];

const amenidades = [
  "Limpieza diaria",
  "Estacionamiento",
  "Seguridad 24/7",
  "Recepción multilingüe",
  "Servicio de conserjería",
  "Traslados",
];

const contactos = [
  {
    icon: <LocationOn sx={{ fontSize: 40, color: "#F26522" }} />,
    title: "Dirección",
    content: "Blvd. Costera Miguel Alemán 97, Acapulco",
  },
  {
    icon: <Phone sx={{ fontSize: 40, color: "#F26522" }} />,
    title: "Teléfono",
    content: "+52 744 435 1500",
  },
  {
    icon: <Email sx={{ fontSize: 40, color: "#F26522" }} />,
    title: "Correo",
    content: "reservaciones@fiestaamericana.com",
  },
];

const Bienvenida = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImage = (dir) =>
    setCurrentImageIndex((prev) =>
      dir === "next"
        ? prev === images.length - 1
          ? 0
          : prev + 1
        : prev === 0
        ? images.length - 1
        : prev - 1
    );

  const SectionTitle = ({ children }) => (
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        color: "#F26522",
        mb: 4,
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: -8,
          left: 0,
          width: "60px",
          height: "4px",
          backgroundColor: "#F26522",
        },
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(242,101,34,0.1) 100%)",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: "#F26522", mb: 2 }}
        >
          FIESTA AMERICANA ACAPULCO VILLAS
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#333", mb: 3, fontStyle: "italic" }}
        >
          Un destino favorito en el corazón de los viajeros
        </Typography>
        <Typography sx={{ mt: 2, color: "#555" }}>
          Con una imagen totalmente renovada,{" "}
          <strong style={{ color: "#F26522" }}>
            Fiesta Americana Acapulco Villas
          </strong>{" "}
          reabre sus puertas para hacerte vivir unas vacaciones inolvidables.
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
            backgroundColor: "rgba(242, 101, 34, 0.1)",
            borderRadius: "8px",
            width: "fit-content",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#F26522" }}
          >
            4.5
          </Typography>
          <Box sx={{ display: "flex", color: "#FFD700" }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} fontSize="large" />
            ))}
          </Box>
          <Typography variant="body1" sx={{ color: "#666", ml: 1 }}>
            Excelente según 1,245 reseñas
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ position: "relative", mb: 6 }}>
        <Card elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="450"
            image={images[currentImageIndex].url}
            alt={images[currentImageIndex].alt}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
              color: "white",
            }}
          >
            <Typography variant="h6">
              {images[currentImageIndex].title}
            </Typography>
          </Box>
        </Card>
        <IconButton
          onClick={() => handleImage("prev")}
          sx={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => handleImage("next")}
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255,255,255,0.7)",
          }}
        >
          <ChevronRight fontSize="large" />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}>
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: i === currentImageIndex ? "#F26522" : "#ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              height: "100%",
              border: "1px solid rgba(242, 101, 34, 0.3)",
              borderRadius: "12px",
            }}
          >
            <SectionTitle>Sobre Nosotros</SectionTitle>
            <Typography sx={{ mb: 2, color: "#555" }}>
              Fiesta Americana Acapulco Villas combina elegancia moderna con el
              encanto natural de la costa.
            </Typography>
            <List dense>
              {amenidades.map((item, i) => (
                <ListItem key={i} sx={{ py: 0.5 }}>
                  <ListItemIcon>
                    <CleaningServices sx={{ color: "#F26522" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ color: "#555" }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Box sx={{ height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2235.5364113196815!2d-99.87650448401637!3d16.859937674685238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85caf7e5dc1b19d5%3A0x9258f9f157b31a6e!2sHS%20HOTSSON%20Acapulco!5e0!3m2!1ses!2smx!4v1754059685677!5m2!1ses!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <CardContent sx={{ backgroundColor: "#f9f9f9" }}>
              <Typography variant="body2" sx={{ color: "#555" }}>
                <LocationOn
                  sx={{ color: "#F26522", verticalAlign: "middle" }}
                />
                Blvd. Costera Miguel Alemán 97, Fracc. Condesa, 39670 Acapulco,
                Gro.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 6 }}>
        <SectionTitle>Nuestros Servicios</SectionTitle>
        <Grid container spacing={3}>
          {servicios.map((servicio, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  borderRadius: "12px",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      backgroundColor: "rgba(242, 101, 34, 0.1)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    {servicio.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {servicio.titulo}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {servicio.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <SectionTitle>Contacto</SectionTitle>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={3}>
          {contactos.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid rgba(242, 101, 34, 0.2)",
                  borderRadius: "12px",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 2 }}>{item.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", fontWeight: "bold", mb: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", color: "#555" }}
                >
                  {item.content}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, rgba(242,101,34,0.9) 0%, rgba(242,101,34,0.7) 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          ¿Listo para reservar?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, fontStyle: "italic" }}>
          Vive una experiencia inolvidable
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "white",
            color: "#F26522",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
          }}
        >
          Reservar Ahora
        </Button>
      </Paper>
    </Container>
  );
};

export default Bienvenida;
