interface selectType {
  title: string;
  value: string;
}

const FormRowSelect = ({
  labelText,
  disabled,
  name,
  value,
  handleChange,
  list,
}: {
  labelText: string;
  disabled: boolean;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[] | selectType[];
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
        {list?.map((itemValue: any, index: number) => {
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
