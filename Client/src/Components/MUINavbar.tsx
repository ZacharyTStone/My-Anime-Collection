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
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useAppContext } from "./../context/appContext";
import FlagContainer from "./FlagContainer";
import Logo from "./UI/Logo";
import NavLinks from "./UI/NavLinks";

const MUINavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
          backgroundColor: "var(--white)",
          borderBottom: "1px solid var(--grey-200)",
          boxShadow: "var(--shadow)",
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
                    backgroundColor: "var(--primary-50)",
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
                    boxShadow: "var(--shadow-md)",
                    borderRadius: "var(--borderRadius)",
                    border: "1px solid var(--grey-100)",
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
              <Tooltip
                title="Other Settings"
                className="nav-link"
                arrow
                placement="bottom"
                sx={{
                  "& .MuiTooltip-arrow": {
                    color: "var(--grey-800)",
                  },
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "var(--grey-800)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                  },
                }}
              >
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
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    boxShadow: "var(--shadow-md)",
                    borderRadius: "var(--borderRadius)",
                    border: "1px solid var(--grey-100)",
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
                    "&:hover": {
                      backgroundColor: "var(--primary-50)",
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      color: "var(--grey-800)",
                      fontWeight: 500,
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
  align-items: center;
  justify-content: center;
  width: 100%;
  background: var(--white);
  box-shadow: var(--shadow);

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
      background-color: var(--primary-500);
      border-radius: 2px;
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
  transition: all 0.2s ease;
  background-color: var(--grey-50);
  border: 1px solid var(--grey-200);

  &:hover {
    background-color: var(--primary-50);
    border-color: var(--primary-100);
  }

  svg {
    font-size: 1.25rem;
    color: var(--grey-700);
  }

  span {
    color: var(--grey-800);
    font-weight: 500;
    font-size: 0.95rem;
    margin: 0 4px;
  }
`;

export default MUINavbar;
