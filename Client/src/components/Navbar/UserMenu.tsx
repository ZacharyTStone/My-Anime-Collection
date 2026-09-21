import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ChevronDownIcon, CircleUserRound } from "lucide-react";
import { useAuthSelector } from "../../hooks/storeSelectors";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logoutUser, user } = useAuthSelector((s) => ({
    logoutUser: s.logoutUser,
    user: s.user,
  }));

  const handleLogout = () => {
    logoutUser();
    navigate("/landing");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <CircleUserRound className="text-primary-600" />
          <span>{user?.name || "Guest"}</span>
          <ChevronDownIcon className="text-primary-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>{t("navbar.logout")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
