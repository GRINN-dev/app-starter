import { FC } from "react";
import { SelectProps } from "./types";
import { useFormContext } from "react-hook-form";

export const SelectInput: FC<SelectProps> = ({
  name,
  description,
  label,
  options,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <div className="pt-2">
        <label htmlFor={name}>{label}</label>
        <p className="mt-1 text-sm text-gray-500" id="email-description">
          {description}
        </p>
      </div>

      <select
        id={name}
        {...register(name)}
        className="block max-w-lg py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        defaultValue=""
      >
        {options.map(option => {
          return (
            <option value={option.value} key={option.key}>
              {option.key}
            </option>
          );
        })}
      </select>

      {errors[name] ? (
        <div className="mt-2 text-sm text-red-600" id="email-error">
          {errors[name] && <span>{errors[name][0]}</span>}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
