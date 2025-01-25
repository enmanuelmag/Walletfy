type NumberInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> & {
  label: string;
  value: number;
  error?: string;
  className?: string;
  onChange: (value: number) => void;
};

const NumberInput = (props: NumberInputProps) => {
  const { label, value, error, onChange, className, ...rest } = props;

  return (
    <div className={className}>
      <label className="cd-block cd-text-sm cd-font-medium cd-text-gray-700 dark:cd-text-gray-200">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);

          if (isNaN(newValue)) return;

          onChange(newValue);
        }}
        className="cd-mt-1 cd-block cd-w-full cd-px-3 cd-py-2 cd-border cd-border-gray-300 cd-rounded-md cd-shadow-sm focus:cd-outline-none focus:cd-ring-violet-500 focus:cd-border-violet-500 sm:cd-text-sm dark:cd-bg-zinc-800 dark:cd-text-gray-200 dark:cd-border-zinc-700"
        {...rest}
      />
      {error && <p className="cd-mt-2 cd-text-sm cd-text-red-600">{error}</p>}
    </div>
  );
};

export default NumberInput;
