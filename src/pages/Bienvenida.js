import React from "react";
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
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Restaurant,
  Pool,
  Spa,
  FitnessCenter,
  LocalBar,
  Wifi,
  Security,
  CleaningServices,
  Star,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";

const Bienvenida = () => {
  const servicios = [
    {
      icon: <Restaurant sx={{ fontSize: 40, color: "#1976d2" }} />,
      titulo: "Restaurante Gourmet",
      descripcion: "Gastronomía internacional con chefs de renombre.",
    },
    {
      icon: <Pool sx={{ fontSize: 40, color: "#1976d2" }} />,
      titulo: "Piscina Infinity",
      descripcion: "Vista panorámica al océano con servicio de bar.",
    },
    {
      icon: <Spa sx={{ fontSize: 40, color: "#1976d2" }} />,
      titulo: "Spa & Wellness",
      descripcion: "Tratamientos relajantes y masajes terapéuticos.",
    },
    {
      icon: <FitnessCenter sx={{ fontSize: 40, color: "#1976d2" }} />,
      titulo: "Gimnasio 24/7",
      descripcion: "Equipos de última generación.",
    },
    {
      icon: <LocalBar sx={{ fontSize: 40, color: "#1976d2" }} />,
      titulo: "Bar Lounge",
      descripcion: "Cócteles artesanales y música en vivo.",
    },
    {
      icon: <Wifi sx={{ fontSize: 40, color: "#1976d2" }} />,
      titulo: "WiFi Gratuito",
      descripcion: "Conexión de alta velocidad en todo el hotel.",
    },
  ];

  const amenidades = [
    "Limpieza diario",
    "Estacionamiento gratuito",
    "Seguridad 24/7",
    "Recepción multilingüe",
    "Servicio de conserjería",
    "Traslados al aeropuerto",
  ];

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 4,
          mb: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          🏨 Fiesta Americana Acapulco Villas
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Tu escape perfecto al paraíso
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", maxWidth: 800, mx: "auto" }}>
          Resort de 5 estrellas con experiencias únicas y atención
          personalizada.
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Chip icon={<Star />} label="5 Estrellas" color="warning" />
          <Chip icon={<LocationOn />} label="Vista al Océano" color="info" />
          <Chip icon={<Security />} label="Seguridad 24/7" color="success" />
        </Box>
      </Paper>

      {/* Información del Hotel */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
            Sobre Nosotros
          </Typography>
          <Typography paragraph sx={{ fontSize: "1.1rem" }}>
            Fiesta Americana Acapulco Villas combina elegancia moderna con el
            encanto natural de la costa. 150 habitaciones con máxima comodidad y
            privacidad.
          </Typography>
          <Typography paragraph sx={{ fontSize: "1.1rem" }}>
            Ubicado en una de las playas más hermosas, con vistas panorámicas y
            acceso directo a la playa.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
              Características:
            </Typography>
            <List dense>
              {amenidades.map((amenidad, i) => (
                <ListItem key={i} sx={{ py: 0 }}>
                  <ListItemIcon>
                    <CleaningServices color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={amenidad} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={4}>
            <CardMedia
              component="img"
              height="300"
              image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Fiesta Americana Acapulco Villas"
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Servicios */}
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2" }}>
        Nuestros Servicios
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {servicios.map((servicio, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                {servicio.icon}
                <Typography variant="h6" gutterBottom>
                  {servicio.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {servicio.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mapa del Hotel */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", textAlign: "center", mb: 3 }}>
          Ubicación del Hotel
        </Typography>
        <Typography paragraph sx={{ textAlign: "center", mb: 3, fontSize: "1.1rem" }}>
          Fiesta Americana Acapulco Villas se encuentra en una de las mejores ubicaciones de Acapulco, 
          con acceso directo a la playa y vistas espectaculares al océano Pacífico.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card elevation={4} sx={{ height: 400, overflow: 'hidden' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.1234567890123!2d-99.87654321098765!3d16.78901234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c8f8b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8!2sFiesta+Americana+Acapulco+Villas!5e0!3m2!1ses!2smx!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fiesta Americana Acapulco Villas"
              />
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
                Información de Ubicación
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dirección"
                    secondary="Blvd. Costera Miguel Alemán 97, Fracc. Condesa, 39670 Acapulco, Gro."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Teléfono"
                    secondary="+52 744 435 1500"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email"
                    secondary="reservaciones.acapulco@fiestaamericana.com"
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
                  Cómo Llegar
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Desde el Aeropuerto Internacional de Acapulco:</strong><br />
                  • Tiempo estimado: 25 minutos<br />
                  • Distancia: 18 km<br />
                  • Servicio de traslado disponible
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Desde el Centro de Acapulco:</strong><br />
                  • Tiempo estimado: 15 minutos<br />
                  • Distancia: 8 km<br />
                  • Taxi o transporte público disponible
                </Typography>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
                  Puntos de Interés Cercanos
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Playa Condesa"
                      secondary="A 2 minutos caminando"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Centro Comercial La Isla"
                      secondary="A 5 minutos en auto"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Zona Dorada"
                      secondary="A 10 minutos en auto"
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Contacto */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, background: "#f8f9fa" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", textAlign: "center" }}
        >
          Contacto
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {[
            {
              icon: <LocationOn sx={{ fontSize: 40, color: "#1976d2" }} />,
              title: "Dirección",
              text: "Playa Paradise #123\nCosta del Sol, CP 12345",
            },
            {
              icon: <Phone sx={{ fontSize: 40, color: "#1976d2" }} />,
              title: "Teléfono",
              text: "+1 (809) 555-0123\nReservas: +1 (809) 555-0125",
            },
            {
              icon: <Email sx={{ fontSize: 40, color: "#1976d2" }} />,
              title: "Email",
              text: "info@fiestaamericana.com\nreservas@fiestaamericana.com",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{ textAlign: "center" }}>
                {item.icon}
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* CTA */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          ¿Listo para tu aventura?
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Reserva ahora y obtén descuentos especiales
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: "white", color: "#1976d2" }}
          >
            Hacer Reserva
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderColor: "white", color: "white" }}
          >
            Ver Habitaciones
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Bienvenida;
