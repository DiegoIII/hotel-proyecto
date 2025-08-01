import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = {
    primary: "#E67E22",
    secondary: "#2C3E50",
    accent: "#16A085",
    lightBg: "#F9F9F9",
    text: "#34495E",
    lightText: "#7F8C8D",
  };

  const socialLinks = [
    { icon: <Facebook />, href: "#", label: "Facebook" },
    { icon: <Twitter />, href: "#", label: "Twitter" },
    { icon: <Instagram />, href: "#", label: "Instagram" },
    { icon: <LinkedIn />, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { text: "Reservas", href: "/reservas" },
    { text: "Habitaciones", href: "/habitaciones" },
    { text: "Servicios", href: "/servicios" },
    { text: "Contacto", href: "/contacto" },
  ];

  const services = [
    "Restaurante Gourmet",
    "Spa & Wellness",
    "Piscina Infinity",
    "Gimnasio 24/7",
    "Bar Lounge",
    "WiFi Gratuito",
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.secondary,
        color: "#fff",
        mt: "auto",
        pt: 4,
        pb: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información del Hotel */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: colors.primary,
                mb: 2,
              }}
            >
              🏨 Fiesta Americana Acapulco Villas
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#BDC3C7",
                lineHeight: 1.6,
                mb: 2,
              }}
            >
              Un destino favorito en el corazón de los viajeros y el hotel
              perfecto para vacacionar. Vive una experiencia inolvidable frente
              al mar en Acapulco.
            </Typography>

            {/* Información de Contacto */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocationOn
                  sx={{ fontSize: 16, color: colors.primary, mr: 1 }}
                />
                <Typography variant="body2" sx={{ color: "#BDC3C7" }}>
                  Blvd. Costera Miguel Alemán 97, Acapulco
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ fontSize: 16, color: colors.primary, mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#BDC3C7" }}>
                  +52 744 435 1500
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ fontSize: 16, color: colors.primary, mr: 1 }} />
                <Typography variant="body2" sx={{ color: "#BDC3C7" }}>
                  reservaciones.acapulco@fiestaamericana.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Enlaces Rápidos */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: colors.primary,
                mb: 2,
              }}
            >
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  sx={{
                    color: "#BDC3C7",
                    textDecoration: "none",
                    "&:hover": {
                      color: colors.primary,
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Servicios */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: colors.primary,
                mb: 2,
              }}
            >
              Nuestros Servicios
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {services.map((service) => (
                <Typography
                  key={service}
                  variant="body2"
                  sx={{
                    color: "#BDC3C7",
                    "&:hover": {
                      color: colors.primary,
                    },
                  }}
                >
                  • {service}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "#34495E" }} />

        {/* Redes Sociales y Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "center",
            gap: 2,
          }}
        >
          {/* Redes Sociales */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                sx={{
                  color: "#BDC3C7",
                  "&:hover": {
                    color: colors.primary,
                    backgroundColor: "rgba(230, 126, 34, 0.1)",
                  },
                }}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: "#BDC3C7",
              textAlign: isMobile ? "center" : "right",
            }}
          >
            © {new Date().getFullYear()} Fiesta Americana Acapulco Villas. Todos
            los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
