import { useTranslation } from "react-i18next";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeSelector } from "../../stores/hooks";

const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useThemeSelector((s) => ({
    theme: s.theme,
    toggleTheme: s.toggleTheme,
  }));

  return (
    <div className="flex items-center justify-center mr-3">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t(
          theme === "dark" ? "navbar.light_mode" : "navbar.dark_mode"
        )}
        className="p-2 rounded-lg text-[var(--primary-500)] cursor-pointer bg-transparent border-none transition-colors hover:bg-[var(--primary-alpha-10)]"
      >
        {theme === "dark" ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
      </button>
    </div>
  );
};

export default ThemeToggle;
