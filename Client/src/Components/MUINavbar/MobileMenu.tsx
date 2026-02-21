import { useCallback, useState, useRef, type MouseEvent } from "react";
import { HiMenu } from "react-icons/hi";
import NavLinks from "../UI/NavLinks";
import { useClickOutside } from "../../utils/hooks";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = useCallback(() => setOpen(false), []);

  useClickOutside(menuRef, open, handleClose);

  return (
    <div className="grow md:hidden relative" ref={menuRef}>
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-controls="mobile-menu"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleOpen}
        className="p-2 rounded-lg text-[var(--primary-500)] cursor-pointer bg-transparent border-none transition-colors hover:bg-[var(--primary-alpha-10)]"
      >
        <HiMenu size={28} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleClose} />
          <div
            id="mobile-menu"
            className="absolute left-0 top-full mt-1.5 z-50 flex flex-col items-start rounded-[var(--borderRadius)] border border-[var(--primary-alpha-20)] glass-dropdown"
          >
            <NavLinks />
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
