import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useAuthContext } from "./../context/AuthContext";
import FlagContainer from "./FlagContainer";
import Logo from "./UI/Logo";
import NavLinks from "./UI/NavLinks";

const MUINavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logoutUser, user } = useAuthContext();

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

  const handleLogout = () => {
    handleCloseUserMenu();
    logoutUser();
    navigate("/landing");
  };

  return (
    <Navbar>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--primary-alpha-15)",
          boxShadow: "0 2px 10px var(--primary-alpha-10)",
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ padding: "0.5rem 1rem" }}>
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

            <Box sx={{ flexGrow: 6, display: { xs: "none", md: "flex" } }}>
              <NavLinks />
            </Box>
            <FlagContainer />

            <Box sx={{ flexGrow: 0 }}>
              <UserIcon onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <FaUserCircle color="var(--grey-700)" />
                <span
                  style={{
                    color: "var(--grey-800)",
                  }}
                >
                  {user?.name || "Guest"}
                </span>
                <FaCaretDown color="var(--primary-500)" />
              </UserIcon>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid var(--primary-alpha-20)",
                    boxShadow: "0 4px 20px var(--primary-alpha-15)",
                    borderRadius: "var(--borderRadius)",
                  },
                }}
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
                <MenuItem
                  key={1}
                  onClick={handleLogout}
                  sx={{
                    padding: "0.75rem 1.5rem",
                    "&:hover": {
                      backgroundColor: "var(--primary-alpha-10)",
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      color: "var(--grey-800)",
                      fontWeight: 500,
                      width: "100%",
                    }}
                  >
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
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  background: transparent;
  box-shadow: none;

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .btn button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
  }

  .active {
    color: var(--primary-600);
    font-weight: 600;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--gradient-primary);
      border-radius: 2px;
      opacity: 0.6;
    }
  }

  .active .icon {
    color: var(--primary-600);
  }
`;

const UserIcon = styled(IconButton)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 24px;
  background: linear-gradient(135deg, var(--grey-50) 0%, var(--white) 100%);
  border: 2px solid var(--primary-alpha-20);
  box-shadow: 0 2px 8px var(--primary-alpha-10);

  svg {
    font-size: 1.25rem;
    color: var(--primary-600);
  }

  span {
    color: var(--grey-800);
    font-weight: 500;
    font-size: 0.95rem;
    margin: 0 4px;
  }
`;

export default MUINavbar;
