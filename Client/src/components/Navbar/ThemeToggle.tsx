import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { useThemeSelector } from "../../hooks/storeSelectors";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeSelector((s) => ({
    theme: s.theme,
    toggleTheme: s.toggleTheme,
  }));

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={t(theme === "dark" ? "navbar.light_mode" : "navbar.dark_mode")}
      className="mr-3 text-primary-500"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggle;
