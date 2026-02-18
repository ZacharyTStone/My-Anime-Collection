import { useState, type MouseEvent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import NavLinks from "../UI/NavLinks";

const MobileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
        sx={{
          color: "var(--primary-500)",
          "&:hover": {
            backgroundColor: "var(--primary-alpha-10)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <MenuIcon
          sx={{
            fontSize: "1.75rem",
            cursor: "pointer",
            color: "var(--primary-500)",
          }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
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
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          alignItems: "left",
          "& .MuiPaper-root": {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid var(--primary-alpha-20)",
            boxShadow: "0 4px 20px var(--primary-alpha-15)",
            borderRadius: "var(--borderRadius)",
            mt: 1.5,
          },
        }}
      >
        <NavLinks />
      </Menu>
    </Box>
  );
};

export default MobileMenu;
