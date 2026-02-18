import type { JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { AiFillGold } from "react-icons/ai";
import { IconContext } from "react-icons";

const NavLinks = () => {
  const { t } = useTranslation();
  const location = useLocation();

  interface Link {
    id: number;
    text: string;
    path: string;
    icon: JSX.Element;
  }

  const LINKS: Link[] = [
    {
      id: 1,
      text: t("navbar.home"),
      path: "my-animes",
      icon: <BsFillCollectionFill />,
    },
    {
      id: 2,
      text: t("navbar.edit_playlist"),
      path: "edit-playlist",
      icon: <MdPlaylistAdd />,
    },
    {
      id: 3,
      text: t("navbar.add"),
      path: "add-anime",
      icon: <RiAddFill />,
    },
    {
      id: 4,
      text: t("navbar.top"),
      path: "top-animes",
      icon: <AiFillGold />,
    },
    {
      id: 5,
      text: t("navbar.profile"),
      path: "profile",
      icon: <CgProfile />,
    },
  ];

  return (
    <nav className="navlinks-wrapper">
      <div className="nav-links flex gap-2 max-[768px]:flex-col max-[768px]:w-full max-[768px]:p-2">
        {LINKS.map((link: Link) => {
          const { text, path, id, icon } = link;
          const isActive = location.pathname.includes(path);

          return (
            <NavLink
              to={path}
              key={id}
              className="nav-item no-underline"
            >
              <Button
                className={isActive ? "nav-link active" : "nav-link"}
                sx={{
                  borderRadius: "8px",
                  padding: "6px 12px",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive
                    ? "rgba(212, 54, 124, 0.08)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "rgba(212, 54, 124, 0.12)"
                      : "rgba(212, 54, 124, 0.05)",
                  },
                  "& .icon": {
                    display: "flex",
                    alignItems: "center",
                    marginRight: "6px",
                  },
                  "& .nav-text": {
                    marginTop: "2px",
                  },
                  "&, & *": {
                    color: isActive ? "var(--primary-600)" : "var(--grey-600)",
                    WebkitTextFillColor: isActive ? "var(--primary-600)" : "var(--grey-600)",
                    background: "none",
                    WebkitBackgroundClip: "border-box",
                  },
                  display: "flex",
                  alignItems: "center",
                  fontWeight: isActive ? 600 : 500,
                  textTransform: "none",
                  letterSpacing: 0,
                  fontSize: "0.95rem",
                  "@media (max-width: 768px)": {
                    width: "100%",
                    justifyContent: "flex-start",
                    padding: "0.75rem 1rem",
                  },
                }}
              >
                <IconContext.Provider
                  value={{
                    size: "1.25rem",
                    color: isActive ? "var(--primary-600)" : "var(--grey-600)",
                  }}
                >
                  <span className="icon">{icon}</span>
                </IconContext.Provider>
                <span className="nav-text">{text}</span>
              </Button>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;
