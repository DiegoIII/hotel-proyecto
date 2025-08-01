import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import {
  People as PeopleIcon,
  Hotel as HotelIcon,
  BookOnline as BookOnlineIcon,
  Restaurant as RestaurantIcon,
  Payment as PaymentIcon,
  Inventory as InventoryIcon,
  Build as BuildIcon,
  Comment as CommentIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuGroups = [
    {
      name: "Administración",
      items: [
        {
          text: "Usuarios",
          icon: <PeopleIcon fontSize="small" />,
          path: "/usuarios",
        },
        {
          text: "Empleados",
          icon: <PeopleIcon fontSize="small" />,
          path: "/empleados",
        },
        {
          text: "Clientes",
          icon: <PeopleIcon fontSize="small" />,
          path: "/clientes",
        },
      ],
    },
    {
      name: "Habitaciones",
      items: [
        {
          text: "Habitaciones",
          icon: <HotelIcon fontSize="small" />,
          path: "/habitaciones",
        },
        {
          text: "Tipos de Habitación",
          icon: <HotelIcon fontSize="small" />,
          path: "/tipos-habitacion",
        },
        {
          text: "Reservas",
          icon: <BookOnlineIcon fontSize="small" />,
          path: "/reservas",
        },
      ],
    },
    {
      name: "Servicios",
      items: [
        {
          text: "Servicios",
          icon: <RestaurantIcon fontSize="small" />,
          path: "/servicios",
        },
        {
          text: "Reserva Servicios",
          icon: <RestaurantIcon fontSize="small" />,
          path: "/reserva-servicios",
        },
      ],
    },
    {
      name: "Operaciones",
      items: [
        {
          text: "Pagos",
          icon: <PaymentIcon fontSize="small" />,
          path: "/pagos",
        },
        {
          text: "Inventario",
          icon: <InventoryIcon fontSize="small" />,
          path: "/inventario",
        },
        {
          text: "Mantenimiento",
          icon: <BuildIcon fontSize="small" />,
          path: "/mantenimiento",
        },
        {
          text: "Comentarios",
          icon: <CommentIcon fontSize="small" />,
          path: "/comentarios",
        },
      ],
    },
  ];

  const handleMenuOpen = (event, menuName) => {
    setActiveMenu(menuName);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 220,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          background: "linear-gradient(to bottom, #1E293B, #0F172A)",
        },
      }}
    >
      {menuGroups
        .find((group) => group.name === activeMenu)
        ?.items.map((item, index) => (
          <MenuItem
            key={item.text}
            onClick={handleMenuClose}
            sx={{
              color: "#E2E8F0",
              "&:hover": {
                backgroundColor: "#334155",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          width: "280px",
          background: "linear-gradient(to bottom, #1E293B, #0F172A)",
        },
      }}
    >
      <MenuItem
        sx={{ color: "#E2E8F0", "&:hover": { backgroundColor: "#334155" } }}
      >
        <IconButton size="large" color="inherit">
          <AccountCircleIcon />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
      {menuGroups.map((group, index) => (
        <Box key={group.name}>
          <Divider sx={{ borderColor: "#334155" }} />
          <Typography
            variant="subtitle2"
            sx={{
              px: 2,
              py: 1,
              color: "#94A3B8",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.7rem",
            }}
          >
            {group.name}
          </Typography>
          {group.items.map((item) => (
            <MenuItem
              key={item.text}
              onClick={handleMobileMenuClose}
              sx={{
                color: "#E2E8F0",
                "&:hover": { backgroundColor: "#334155" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
        </Box>
      ))}
    </Menu>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1E293B",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        px: { xs: 1, md: 3 },
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important" }}>
        {/* Logo/Brand */}
        <Box
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <img
            src="/images/icons/logo.png"
            alt="Logo"
            style={{
              height: "40px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Mobile menu button */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="primary-search-account-menu-mobile"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop menu items */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 3,
            gap: 1,
          }}
        >
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            href="/"
            sx={{
              color: "#E2E8F0",
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              "&:hover": {
                backgroundColor: "#334155",
              },
            }}
          >
            Inicio
          </Button>

          {menuGroups.map((group) => (
            <Button
              key={group.name}
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => handleMenuOpen(e, group.name)}
              sx={{
                color: "#E2E8F0",
                textTransform: "none",
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  backgroundColor: "#334155",
                },
              }}
            >
              {group.name}
            </Button>
          ))}
        </Box>

        {/* Right side icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: "auto",
            gap: 1,
          }}
        >
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {renderMenu}
      {renderMobileMenu}
    </AppBar>
  );
};

export default Navbar;
