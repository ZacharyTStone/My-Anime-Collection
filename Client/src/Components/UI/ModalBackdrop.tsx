import { useEffect, type ReactNode } from "react";

interface ModalBackdropProps {
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const ModalBackdrop = ({ onClose, ariaLabel, children, className }: ModalBackdropProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] ${className || "bg-black/50 backdrop-blur-[4px]"}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalBackdrop;
