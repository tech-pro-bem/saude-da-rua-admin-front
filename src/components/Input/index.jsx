/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Controller } from 'react-hook-form';

export default function Input({
  name,
  label,
  control,
  placeholder,
  onChange = () => {},
  rules = {},
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col mb-6">
          <label htmlFor={name} className="flex flex-col" />
          <span className="text-primary-black mb-2">{label}</span>
          <input
            {...field}
            id={name}
            required
            placeholder={placeholder}
            className={`w-full px-6 py-3 pr-14 bg-transparent rounded-lg text-primary-black placeholder:text-medium-grey
                  outline outline-1 ${error ? 'outline-error' : 'outline-primary-black'}`}
            name={name}
            onChange={(e) => {
              onChange(e);
              field.onChange(e);
            }}
          />
          {error && <span className="mt-1 text-sm text-error">{error.message}</span>}
        </div>
      )}
    />
  );
}
