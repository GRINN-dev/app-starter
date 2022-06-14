import { FC } from "react";
import { RadioGroupProps } from "./types";

export const RadioGroup: FC<RadioGroupProps> = ({
  name,
  description,
  options,
  label,
}) => {
  return (
    <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:border-t sm:pt-2">
      <label className="block pt-2 text-lg font-medium text-gray-800">
        {label}
      </label>
      <p className="text-sm leading-5 text-gray-500">{description}</p>
      <fieldset className="mt-2">
        <legend className="sr-only">{label}</legend>
        <div className="space-y-4">
          {options.map(option => (
            <div key={option.key} className="flex items-center">
              <input
                id={option.key}
                name={name}
                type="radio"
                defaultChecked={option.key === option.value[0]}
                className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-300"
              />
              <label
                htmlFor={option.key}
                className="block ml-3 text-sm font-medium text-gray-800"
              >
                {option.value}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
