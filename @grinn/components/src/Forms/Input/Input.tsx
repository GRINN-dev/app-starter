import React from "react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { InputProps } from "./types";

const InputUnMemo: FC<InputProps> = ({
  name,
  options,
  placeholder,
  label,
  description,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start ">
      <div>
        <label
          htmlFor={name}
          className="block text-lg font-medium text-gray-800"
        >
          {label}
        </label>
        <p
          className="max-w-2xl mt-1 text-sm text-gray-500 "
          id="email-description"
        >
          {description}
        </p>
      </div>

      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          id={name}
          className="block w-full max-w-lg border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm placeholder:pl-2 "
          placeholder={placeholder}
          {...register(name, options)}
        ></input>
        {errors[name] ? (
          <div className="mt-2 text-sm text-red-600">
            {errors[name] && <span>{errors[name].message}</span>}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export const Input = React.memo(InputUnMemo);
