import FlagContainer from "../FlagContainer";
import Logo from "../UI/Logo";
import NavLinks from "../UI/NavLinks";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const MUINavbar = () => {
  return (
    <nav className="h-[var(--nav-height)] flex items-start justify-center w-full bg-transparent shadow-none">
      <div className="w-full border-b border-[var(--primary-alpha-15)] relative glass-navbar">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center py-2 px-4">
            <div className="grow hidden md:block">
              <Logo />
            </div>
            <MobileMenu />
            <div className="grow-[6] hidden md:flex">
              <NavLinks />
            </div>
            <FlagContainer />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MUINavbar;
