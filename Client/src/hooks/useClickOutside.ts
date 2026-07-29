import { useEffect, type RefObject } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void
) => {
  useEffect(() => {
    if (!active) return;
    const handleClick = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, active, onClose]);
};

export { useClickOutside };
