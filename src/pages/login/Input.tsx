import { FC } from 'react';
import { FieldProps } from 'formik';

type CustomInputProps = {
  type: string;
  label: string;
  error: string | null;
};

const Input: FC<CustomInputProps & FieldProps> = ({ field, type, label, error }) => {
  return (
    <>
      <div className="relative mt-4">
        <input
          {...field}
          id={field.name}
          type={type}
          placeholder={label}
          className={`
          peer block w-full rounded border px-3 py-1 outline-none placeholder:text-transparent
          transition-all duration-200 ease-linear motion-reduce:transition-none
          focus:border-indigo-500
          ${error ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        <label
          htmlFor={field.name}
          className={`
          pointer-events-none absolute left-3 top-1 max-w-[90%] origin-[0_0] truncate text-neutral-500
          transition-all duration-200 ease-out
          -translate-y-[0.9rem] peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-[0.9rem]
          scale-[0.8] peer-placeholder-shown:scale-[1] peer-focus:scale-[0.8]
          peer-focus:text-primary bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent peer-focus:text-indigo-500
          motion-reduce:transition-none
          ${error ? 'text-red-500 peer-focus:text-red-500' : ''}`}
        >
          {label}
        </label>
      </div>
      {error && <div className="text-red-500 text-xs pl-3">{error}</div>}
    </>
  );
};

export default Input;
