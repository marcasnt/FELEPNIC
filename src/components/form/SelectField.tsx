import React from 'react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  helpText?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  options,
  containerClassName = '',
  labelClassName = '',
  selectClassName = '',
  id,
  helpText,
  ...props
}) => {
  const selectId = id || props.name;
  return (
    <div className={containerClassName + ' mb-2'}>
      <label htmlFor={selectId} className={labelClassName + ' block text-sm font-medium text-gray-700'}>
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={
          selectClassName +
          ' mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500' +
          (error ? ' border-red-400' : '')
        }
        {...props}
      >
        <option value="">Seleccionar...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {helpText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helpText}</p>
      )}
      {error && (
        <p id={`${selectId}-error`} className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
