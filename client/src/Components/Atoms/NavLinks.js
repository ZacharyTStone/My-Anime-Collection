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

  const links = [
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
        {links.map((link) => {
          const { text, path, id, icon } = link;

          return (
            <Button key={id}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <IconContext.Provider
                  value={{
                    size: "1.5rem",
                    color: "var(--primary-500)",
                  }}
                >
                  <span className="icon">{icon}</span>
                </IconContext.Provider>
                {text}
              </NavLink>
            </Button>
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

  .icon {
    margin-right: 0.5rem;
    size: 140%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-link.active {
    color: var(--primary-500);
  }
`;

export default NavLinks;
