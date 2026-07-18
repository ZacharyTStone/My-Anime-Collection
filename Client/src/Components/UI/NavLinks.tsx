import type { JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { BsFillCollectionFill, BsSnow2 } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { AiFillGold } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Button } from "@/Components/UI/button";
import { cn } from "../../utils/cn";

interface NavLinksProps {
  vertical?: boolean;
}

const NavLinks = ({ vertical = false }: NavLinksProps) => {
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
    {
      id: 6,
      text: t("navbar.seasonal"),
      path: "seasonal",
      icon: <BsSnow2 />,
    },
  ];

  return (
    <nav
      className={cn(
        "flex gap-1",
        vertical ? "w-full flex-col" : "flex-row items-center"
      )}
    >
      {LINKS.map((link: Link) => {
        const { text, path, id, icon } = link;
        const isActive = location.pathname.includes(path);

        return (
          <Button
            key={id}
            asChild
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "no-underline",
              isActive && "text-primary-600 font-semibold",
              vertical && "w-full justify-start"
            )}
          >
            <NavLink to={path}>
              <IconContext.Provider
                value={{
                  size: "1.25rem",
                  color: isActive ? "var(--primary-600)" : "var(--grey-600)",
                }}
              >
                {icon}
              </IconContext.Provider>
              <span>{text}</span>
            </NavLink>
          </Button>
        );
      })}
    </nav>
  );
};

export default NavLinks;
