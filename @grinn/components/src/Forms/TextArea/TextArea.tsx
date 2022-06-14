import { FC } from "react";
import { TextAreaProps } from "./types";
import { useFormContext } from "react-hook-form";

export const TextArea: FC<TextAreaProps> = ({
  name,
  label,
  options,
  description,
  placeholder,
  lines,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <div>
        <label
          htmlFor={name}
          className="block pt-2 text-lg font-medium text-gray-800 sm:mt-px sm:"
        >
          {label}
        </label>{" "}
        <p
          className="max-w-2xl mt-1 text-sm text-gray-500 "
          id="email-description"
        >
          {description}
        </p>
      </div>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          rows={lines}
          id={name}
          className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm placeholder:text-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
          {...register(name, options)}
          placeholder={placeholder}
        />
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
