import type { ChangeEvent } from "react";
import { SelectOption } from "../../utils/types";
import { cn } from "../../utils/cn";


interface FormRowSelectProps {
  labelText: string;
  disabled: boolean;
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  list: SelectOption[];
}

const FormRowSelect = ({
  labelText,
  disabled,
  name,
  value,
  handleChange,
  list,
}: FormRowSelectProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm mb-2 font-medium tracking-wide text-grey-700"
      >
        {labelText || name}
      </label>
      <select
        id={name}
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full px-3 py-2.5 rounded-default bg-[var(--outline-button-background)] border border-grey-300",
          "text-grey-900 text-[0.95rem] min-h-[42px] appearance-none transition-all",
          "focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-500/12",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {list?.map((itemValue: SelectOption) => (
          <option key={itemValue.value} value={itemValue.value}>
            {itemValue.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
