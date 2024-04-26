import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useAppContext } from "./../context/appContext";
import FlagContainer from "./FlagContainer";
import Logo from "./UI/Logo";
import NavLinks from "./UI/NavLinks";

const MUINavbar = () => {
  const { t } = useTranslation();
  const { logoutUser, user } = useAppContext();

  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Navbar>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              <Logo />
            </Box>
            <Box sx={{ flexGrow: 1, display: { md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon
                  sx={{
                    fontSize: "var(--font-size-lg)",
                    cursor: "pointer",
                    color: "var(--primary-500)",
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                <NavLinks />
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 6, display: { xs: "none", md: "flex" } }}>
              <NavLinks />
            </Box>
            <FlagContainer />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Other Settings" className="nav-link">
                <UserIcon onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <FaUserCircle color="var(--textColor)" />
                  <span
                    style={{
                      color: "var(--textColor)",
                    }}
                  >
                    {user.name}
                  </span>
                  <FaCaretDown color="var(--textColor)" />
                </UserIcon>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={1} onClick={logoutUser}>
                  <Typography textAlign="center">
                    {t("navbar.logout")}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Navbar>
  );
};

const Navbar = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100% !important;

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  background: var(--white);

  .btn button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .active {
    color: var(--primary-500);
  }

  .active .icon {
    color: var(--primary-500);
  }
`;

const UserIcon = styled(IconButton)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default MUINavbar;
