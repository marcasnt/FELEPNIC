import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  id,
  ...props
}) => {
  const inputId = id || props.name;
  return (
    <div className={containerClassName + ' mb-2'}>
      <label htmlFor={inputId} className={labelClassName + ' block text-sm font-medium text-gray-700'}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={
          inputClassName +
          ' mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500' +
          (error ? ' border-red-400' : '')
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
