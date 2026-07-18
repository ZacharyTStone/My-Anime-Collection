import type { ChangeEvent } from "react";
import { Input } from "@/Components/UI/input";
import { Label } from "@/Components/UI/label";

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
    <div className="mb-4 grid gap-2">
      <Label htmlFor={name}>{labelText || name}</Label>
      <Input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;
