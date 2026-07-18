import type { ReactNode } from "react";
import { VisuallyHidden } from "radix-ui";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/Components/UI/dialog";

interface ModalBackdropProps {
  onClose: () => void;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

/**
 * Dialog-based modal. Rendered conditionally by callers
 * (`{open && <ModalBackdrop .../>}`), so it is always open while mounted.
 */
const ModalBackdrop = ({
  onClose,
  ariaLabel,
  children,
  className,
}: ModalBackdropProps) => {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent aria-label={ariaLabel} className={className}>
        <VisuallyHidden.Root>
          <DialogTitle>{ariaLabel}</DialogTitle>
        </VisuallyHidden.Root>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalBackdrop;
