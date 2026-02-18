import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import FlagContainer from "../FlagContainer";
import Logo from "../UI/Logo";
import NavLinks from "../UI/NavLinks";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

const MUINavbar = () => {
  return (
    <nav className="h-[var(--nav-height)] flex items-start justify-center w-full bg-transparent shadow-none">
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
            <MobileMenu />
            <Box sx={{ flexGrow: 6, display: { xs: "none", md: "flex" } }}>
              <NavLinks />
            </Box>
            <FlagContainer />
            <UserMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
};

export default MUINavbar;
