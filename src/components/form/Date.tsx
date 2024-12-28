import moment from 'moment';

type DateProps = {
  label: string;
  value: number;
  error?: string;
  className?: string;
  onChange: (value: number) => void;
};

const DateInput = (props: DateProps) => {
  const { label, value, error, onChange, className } = props;

  return (
    <div className={className}>
      <label className="cd-block cd-text-sm cd-font-medium cd-text-gray-700 dark:cd-text-gray-200">
        {label}
      </label>
      <input
        type="date"
        value={moment.unix(value).format('YYYY-MM-DD')}
        onChange={(e) => onChange(moment(e.target.value).unix())}
        className="cd-mt-1 cd-block cd-w-full cd-px-3 cd-py-2 cd-border cd-border-gray-300 cd-rounded-md cd-shadow-sm focus:cd-outline-none focus:cd-ring-violet-500 focus:cd-border-violet-500 sm:cd-text-sm dark:cd-bg-zinc-800 dark:cd-text-gray-200 dark:cd-border-zinc-700"
      />
      {error && <p className="cd-mt-2 cd-text-sm cd-text-red-600">{error}</p>}
    </div>
  );
};

export default DateInput;
