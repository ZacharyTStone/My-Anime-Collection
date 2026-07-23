import FlagContainer from "../FlagContainer";
import Logo from "../UI/Logo";
import NavLinks from "../UI/NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const MUINavbar = () => {
  return (
    <header className="glass-navbar sticky top-0 z-50 w-full border-b border-border/70">
      <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-2">
        <div className="hidden grow md:block">
          <Logo className="mx-0" />
        </div>
        <MobileMenu />
        <div className="hidden grow-[6] md:flex">
          <NavLinks />
        </div>
        <div className="ml-auto flex items-center md:ml-0">
          <FlagContainer />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default MUINavbar;
