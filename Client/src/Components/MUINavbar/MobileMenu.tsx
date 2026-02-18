import { useState, useRef, useEffect, type MouseEvent } from "react";
import { HiMenu } from "react-icons/hi";
import NavLinks from "../UI/NavLinks";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

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
            className="absolute left-0 top-full mt-1.5 z-50 flex flex-col items-start rounded-[var(--borderRadius)] border border-[var(--primary-alpha-20)]"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px var(--primary-alpha-15)",
            }}
          >
            <NavLinks />
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
