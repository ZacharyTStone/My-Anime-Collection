import FlagContainer from "../FlagContainer";
import Logo from "../Logo";
import NavLinks from "../NavLinks";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

const Navbar = () => {
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
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <FlagContainer />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
