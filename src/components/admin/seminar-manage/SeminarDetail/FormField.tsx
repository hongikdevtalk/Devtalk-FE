interface FormFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
}

const FormField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  onPaste,
  error,
  maxLength,
}: FormFieldProps) => {
  return (
    <div className="mb-7">
      <label className="block subhead-1-medium text-white mb-[16px]">{label}</label>
      <input
        type="text"
        id={id}
        name={id}
        className="form-input-base form-input-text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        maxLength={maxLength}
      />

      {error && <p className="text-status-error text-sm mt-[6px]">{error}</p>}
    </div>
  );
};

export default FormField;
