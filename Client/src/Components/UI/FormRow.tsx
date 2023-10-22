const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  disabled,
}: {
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  disabled?: boolean;
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={`form-input ${disabled ? "disabled" : ""}`}
        disabled={disabled}
      />
    </div>
  );
};

export default FormRow;
