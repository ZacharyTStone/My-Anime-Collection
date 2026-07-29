import type { JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { CircleUserRound, Library, ListPlus, Plus, Snowflake, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../utils/cn";

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
      icon: <Library />,
    },
    {
      id: 2,
      text: t("navbar.edit_playlist"),
      path: "edit-playlist",
      icon: <ListPlus />,
    },
    {
      id: 3,
      text: t("navbar.add"),
      path: "add-anime",
      icon: <Plus />,
    },
    {
      id: 4,
      text: t("navbar.top"),
      path: "top-animes",
      icon: <Trophy />,
    },
    {
      id: 5,
      text: t("navbar.profile"),
      path: "profile",
      icon: <CircleUserRound />,
    },
    {
      id: 6,
      text: t("navbar.seasonal"),
      path: "seasonal",
      icon: <Snowflake />,
    },
  ];

  return (
    <nav className={cn("flex gap-1", vertical ? "w-full flex-col" : "flex-row items-center")}>
      {LINKS.map((link: Link) => {
        const { text, path, id, icon } = link;
        const isActive = location.pathname.includes(path);

        return (
          <Button
            key={id}
            asChild
            variant="ghost"
            className={cn(
              "no-underline text-muted-foreground",
              isActive &&
                "bg-primary-500/10 text-primary-600 font-semibold hover:bg-primary-500/15 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-400",
              vertical && "w-full justify-start"
            )}
          >
            <NavLink to={path}>
              {icon}
              <span>{text}</span>
            </NavLink>
          </Button>
        );
      })}
    </nav>
  );
};

export default NavLinks;
