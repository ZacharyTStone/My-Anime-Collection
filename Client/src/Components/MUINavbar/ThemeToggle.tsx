import { useTranslation } from "react-i18next";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeSelector } from "../../stores/hooks";
import { Button } from "@/Components/UI/button";

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
      {theme === "dark" ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
    </Button>
  );
};

export default ThemeToggle;
