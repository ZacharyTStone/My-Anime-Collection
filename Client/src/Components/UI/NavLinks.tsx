import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
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
    <Wrapper>
      <div className="nav-links">
        {LINKS.map((link: Link) => {
          const { text, path, id, icon } = link;
          const isActive = location.pathname.includes(path);

          return (
            <NavLink
              to={path}
              key={id}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .nav-links {
    display: flex;
    gap: 0.5rem;
  }

  .nav-item {
    text-decoration: none;
  }

  .icon {
    display: flex;
    align-items: center;
    margin-right: 6px;
  }

  .nav-link {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: var(--grey-600) !important;
    text-transform: none;
    letter-spacing: 0;
    font-size: 0.95rem;
    
    /* Ensure text is visible */
    &,
    & *,
    & .nav-text {
      color: var(--grey-600) !important;
      -webkit-text-fill-color: var(--grey-600) !important;
    }
  }

  .nav-link.active {
    color: var(--primary-600) !important;
    font-weight: 600;
    
    &,
    & *,
    & .nav-text {
      color: var(--primary-600) !important;
      -webkit-text-fill-color: var(--primary-600) !important;
    }
  }

  .nav-text {
    margin-top: 2px;
    color: inherit !important;
    -webkit-text-fill-color: inherit !important;
  }
  
  .nav-item {
    &,
    & * {
      -webkit-text-fill-color: inherit !important;
      background: none !important;
      -webkit-background-clip: border-box !important;
    }
  }

  @media (max-width: 768px) {
    .nav-links {
      flex-direction: column;
      width: 100%;
      padding: 0.5rem;
    }

    .nav-link {
      width: 100%;
      justify-content: flex-start;
      padding: 0.75rem 1rem;
    }
  }
`;

export default NavLinks;
