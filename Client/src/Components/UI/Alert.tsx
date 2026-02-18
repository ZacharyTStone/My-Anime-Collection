import { useAuthSelector } from "../../stores/hooks";
import { cn } from "../../utils/cn";

interface AlertProps {
  className?: string;
}

const alertStyles: Record<string, string> = {
  danger: "bg-red-light text-red-dark border border-red-light",
  success: "bg-green-50 text-green-500 border border-green-50",
  default: "bg-[var(--yellow-light)] text-[var(--yellow-dark)] border border-[var(--yellow-light)]",
};

const Alert = ({ className }: AlertProps) => {
  const { alertType, alertText, showAlert } = useAuthSelector((s) => ({
    alertType: s.alertType,
    alertText: s.alertText,
    showAlert: s.showAlert,
  }));

  if (!showAlert || !alertText) {
    return null;
  }

  return (
    <div
      className={cn(
        "py-3 px-4 my-4 rounded-default font-medium text-center transition-all duration-300",
        alertStyles[alertType] || alertStyles.default,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {alertText}
    </div>
  );
};

export default Alert;
