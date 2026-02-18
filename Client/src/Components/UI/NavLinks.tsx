import type { JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { CgProfile } from "react-icons/cg";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { AiFillGold } from "react-icons/ai";
import { IconContext } from "react-icons";
import { cn } from "../../utils/cn";

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
              <button
                type="button"
                className={cn(
                  "flex items-center rounded-lg py-1.5 px-3 transition-all duration-200 bg-transparent border-none cursor-pointer",
                  "text-[0.95rem] tracking-normal normal-case",
                  "max-[768px]:w-full max-[768px]:justify-start max-[768px]:py-3 max-[768px]:px-4",
                  isActive
                    ? "bg-[rgba(212,54,124,0.08)] font-semibold text-[var(--primary-600)] hover:bg-[rgba(212,54,124,0.12)]"
                    : "font-medium text-[var(--grey-600)] hover:bg-[rgba(212,54,124,0.05)]"
                )}
              >
                <IconContext.Provider
                  value={{
                    size: "1.25rem",
                    color: isActive ? "var(--primary-600)" : "var(--grey-600)",
                  }}
                >
                  <span className="flex items-center mr-1.5">{icon}</span>
                </IconContext.Provider>
                <span className="mt-0.5">{text}</span>
              </button>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;
