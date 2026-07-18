import type { ChangeEvent } from "react";
import { cn } from "../../utils/cn";

interface FormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  disabled?: boolean;
}

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  disabled,
}: FormRowProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm mb-2 font-medium tracking-wide text-grey-700"
      >
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={cn(
          "w-full px-3 py-2.5 rounded-default bg-[var(--outline-button-background)] border border-grey-300",
          "text-grey-900 text-[0.95rem] min-h-[42px] transition-all",
          "focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-500/12",
          disabled && "opacity-60 cursor-not-allowed"
        )}
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;
