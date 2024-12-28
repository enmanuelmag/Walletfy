type FileProps = {
  label: string;
  error?: string;
  value?: string;
  className?: string;
  onChange: (value: string) => void;
};

const FileInput = (props: FileProps) => {
  const { label, value, error, onChange, className } = props;

  return (
    <div className={className}>
      <label className="cd-block cd-text-sm cd-font-medium cd-text-gray-700 dark:cd-text-gray-200">
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
              const result = e.target?.result as string;

              onChange(result);
            };

            reader.readAsDataURL(file);
          } else {
            console.error('No file selected');
          }
        }}
        className="cd-mt-1 cd-block cd-w-full cd-px-3 cd-py-2 cd-border cd-border-gray-300 cd-rounded-md cd-shadow-sm focus:cd-outline-none focus:cd-ring-violet-500 focus:cd-border-violet-500 sm:cd-text-sm dark:cd-bg-zinc-800 dark:cd-text-gray-200 dark:cd-border-zinc-700"
      />
      <div className="cd-flex cd-justify-center cd-items-center cd-mt-2">
        {value ? (
          <img
            src={value}
            alt="attachment"
            className="cd-mt-2 cd-w-20 cd-h-20"
          />
        ) : (
          <p className="cd-mt-2 cd-text-sm cd-text-gray-500 dark:cd-text-gray-400">
            No file selected
          </p>
        )}
      </div>

      {error && <p className="cd-mt-2 cd-text-sm cd-text-red-600">{error}</p>}
    </div>
  );
};

export default FileInput;
