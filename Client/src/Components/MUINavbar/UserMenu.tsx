import { useState, type MouseEvent } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useAuthSelector } from "../../stores/hooks";

const UserMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logoutUser, user } = useAuthSelector((s) => ({
    logoutUser: s.logoutUser,
    user: s.user,
  }));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logoutUser();
    navigate("/landing");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, var(--grey-50) 0%, var(--white) 100%)",
          border: "2px solid var(--primary-alpha-20)",
          boxShadow: "0 2px 8px var(--primary-alpha-10)",
          "& svg": {
            fontSize: "1.25rem",
            color: "var(--primary-600)",
          },
          "& span": {
            color: "var(--grey-800)",
            fontWeight: 500,
            fontSize: "0.95rem",
            margin: "0 4px",
          },
        }}
      >
        <FaUserCircle color="var(--grey-700)" />
        <span className="text-[var(--grey-800)]">
          {user?.name || "Guest"}
        </span>
        <FaCaretDown color="var(--primary-500)" />
      </IconButton>
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
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
  );
};

export default UserMenu;
