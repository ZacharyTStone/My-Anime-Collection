import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { ChevronDownIcon } from "lucide-react";
import { useAuthSelector } from "../../stores/hooks";
import { Button } from "@/Components/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/UI/dropdown-menu";

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
          <FaUserCircle className="text-primary-600" />
          <span>{user?.name || "Guest"}</span>
          <ChevronDownIcon className="text-primary-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>
          {t("navbar.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
