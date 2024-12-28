type SwitchInputProps = {
  label: string;
  value: boolean;
  error?: string;
  className?: string;
  onChange: (value: boolean) => void;
};

const SwitchInput = (props: SwitchInputProps) => {
  const { label, value, error, onChange, className } = props;

  return (
    <div className={`cd-flex cd-flex-row cd-justify-start ${className}`}>
      <label className="cd-block cd-text-sm cd-font-medium cd-text-gray-700">
        {label}
      </label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="cd-mt-1 cd-block cd-mx-3 cd-w-4 cd-h-4 cd-border cd-border-gray-300 cd-rounded-md cd-shadow-sm focus:cd-outline-none focus:cd-ring-violet-500 focus:cd-border-violet-500 sm:cd-text-sm"
      />
      {error && <p className="cd-mt-2 cd-text-sm cd-text-red-600">{error}</p>}
    </div>
  );
};

export default SwitchInput;
