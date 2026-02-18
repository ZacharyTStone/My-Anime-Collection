import { useState, useRef, useEffect, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useAuthSelector } from "../../stores/hooks";

const UserMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logoutUser, user } = useAuthSelector((s) => ({
    logoutUser: s.logoutUser,
    user: s.user,
  }));

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    handleClose();
    logoutUser();
    navigate("/landing");
  };

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
    <div className="shrink-0 relative" ref={menuRef}>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-3xl border-2 border-[var(--primary-alpha-20)] cursor-pointer"
        style={{
          background: "linear-gradient(135deg, var(--grey-50) 0%, var(--white) 100%)",
          boxShadow: "0 2px 8px var(--primary-alpha-10)",
        }}
      >
        <FaUserCircle size={20} color="var(--primary-600)" />
        <span className="text-[var(--grey-800)] font-medium text-[0.95rem] mx-1">
          {user?.name || "Guest"}
        </span>
        <FaCaretDown size={20} color="var(--primary-500)" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleClose} />
          <div
            className="absolute right-0 top-full mt-2 z-50 rounded-[var(--borderRadius)] border border-[var(--primary-alpha-20)] min-w-[140px]"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 20px var(--primary-alpha-15)",
            }}
          >
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 px-6 bg-transparent border-none cursor-pointer text-center text-[var(--grey-800)] font-medium transition-colors hover:bg-[var(--primary-alpha-10)] rounded-[var(--borderRadius)]"
            >
              {t("navbar.logout")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
