import { SelectOption } from "../../utils/types";

export type { SelectOption };

interface FormRowSelectProps {
  labelText: string;
  disabled: boolean;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: SelectOption[];
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  labelText,
  disabled,
  name,
  value,
  handleChange,
  list,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list?.map((itemValue: SelectOption, index: number) => {
          return (
            <option key={index} value={itemValue.value}>
              {itemValue.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
