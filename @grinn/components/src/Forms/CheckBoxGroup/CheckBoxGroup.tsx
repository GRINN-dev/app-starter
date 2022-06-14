import { FC } from "react";
import { CheckBoxGroupProps } from "./types";
import { useFormContext } from "react-hook-form";

export const CheckBoxGroup: FC<CheckBoxGroupProps> = ({
  label,
  description,
  items,
  options,
}) => {
  const { register } = useFormContext();

  return (
    <fieldset className="space-y-5">
      <div>
        <legend className="pt-2 text-lg font-medium text-gray-700">
          {label}
        </legend>
        <p className="text-gray-500 ">{description}</p>
      </div>
      {items.map((item, index) => {
        return (
          <div key={index} className="flex items-start mt-2">
            <input
              id={item.name}
              aria-describedby={item.description}
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              {...register(item.name, options)}
            />
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                {item.key}
              </label>
              <p id="comments-description" className="text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </fieldset>
  );
};
