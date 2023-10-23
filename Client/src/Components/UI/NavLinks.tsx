import { NavLink } from "react-router-dom";
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
          return (
            <NavLink to={path} key={id}>
              <Button className="nav-link">
                <IconContext.Provider
                  value={{
                    size: "1.5rem",
                    color: "var(--primary-500)",
                  }}
                >
                  <span className="icon">{icon}</span>
                </IconContext.Provider>
                <span
                  className={
                    window.location.pathname === path ? "active icon" : "icon"
                  }
                >
                  {text}
                </span>
              </Button>
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media (max-width: 768px) {
    .nav-links {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .nav-links {
    display: flex;
  }

  .icon {
    display: flex;
  }

  .nav-link {
    display: flex;
    gap: 8px !important;
    width: max-content;
  }

  .nav-link.active {
    color: var(--primary-500) !important;
  }
`;

export default NavLinks;
