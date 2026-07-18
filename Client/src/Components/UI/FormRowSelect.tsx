import { Label } from "@/Components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { SelectOption } from "../../utils/types";

interface FormRowSelectProps {
  labelText: string;
  disabled?: boolean;
  name: string;
  value: string;
  handleChange: (value: string) => void;
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
    <div className="mb-4 grid gap-2">
      <Label htmlFor={name}>{labelText || name}</Label>
      <Select
        name={name}
        value={value}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger id={name} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {list?.map((itemValue: SelectOption) => (
            <SelectItem key={itemValue.value} value={itemValue.value}>
              {itemValue.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormRowSelect;
