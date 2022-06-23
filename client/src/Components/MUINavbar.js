import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../context/appContext";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";

const MUINavbar = () => {
  const { logoutUser, user, deleteUser, changeSiteLanguage } = useAppContext();

  const handleLogout = () => {
    if (user.emailProvider === "demo.com") {
      console.log(user.emailProvider);
      deleteUser();
      logoutUser();
    } else {
      logoutUser();
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Wrapper>
      <AppBar position="static" color="transparent" width="100%">
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Logo />
            </Typography>

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
                }}
              >
                <NavLinks />
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Logo />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLinks />
              <button
                onClick={() => {
                  changeSiteLanguage("jp");
                }}
              >
                change language to Japanese
              </button>
              <button
                onClick={() => {
                  changeSiteLanguage("en");
                }}
              >
                change language to English
              </button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings" className="nav-link">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <FaUserCircle color="var(--textColor)" />
                  <span
                    style={{
                      color: "var(--textColor)",
                    }}
                  >
                    {user.name}
                  </span>
                  <FaCaretDown color="var(--textColor)" />
                </IconButton>
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
                <MenuItem key={1} onClick={handleLogout}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
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
  .btn-container {
    position: relative;
    button {
      margin-top: 0px;
      margin-right: 0px;
    }
  }
  .btn button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .active {
    color: var(--primary-500);
  }
  .active .icon {
    color: var(--primary-500);
  }

  @media (min-width: 992px) {
    top: 0;

    .nav-center {
      width: 90%;
    }
  }
`;
export default MUINavbar;
