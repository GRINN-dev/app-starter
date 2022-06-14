import { FC, useState } from "react";
import { Typography } from "../Typography";
import { SelectProps } from ".";
import { Listbox } from "@headlessui/react";
import { CheckIcon, DownIcon } from "@grinn/icons";
import { convertBooleanToString } from "@grinn/lib";

export const Select: FC<SelectProps> = ({
  name,
  listedValues,
  selectedValue,
  onChange,
}) => {
  const list = [...selectedValue, ...listedValues];

  /* const [selected, setSelected] = useState<{
    label: string | boolean | number;
    value: string | boolean | number;
  }>(list[0]); */
  // la valeur par défault est le premier index du tableau qui correspond à la props selectedValue

  return (
    <>
      {/* <div className="relative w-48 bg-white border rounded-md">
        <Listbox
          value={selected}
          onChange={() => {
            setSelected(selected);
            onChange(selected.value);
          }}
        >
          <Listbox.Button className="flex items-center justify-between w-full px-2 text-left">
            <Typography as="span" className="capitalize">
              {convertBooleanToString(selected.label)}
            </Typography>
            <DownIcon className="z-10 w-6 h-6 text-primary-500" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {list.map((x, i) => (
              <Listbox.Option
                key={i}
                value={x}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 px-8 ${
                    active ? "bg-amber-100" : ""
                  }`
                }
              >
                {({ selected }) => (
                  <Typography
                    as="span"
                    className="flex items-center w-full gap-2 capitalize"
                  >
                    {selected && <CheckIcon className="w-3 h-3 -ml-5" />}
                    {convertBooleanToString(x.label)}
                  </Typography>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div> */}
      <select
        name={name}
        id={name}
        onChange={e => onChange(e)}
        className="relative w-48 bg-white border rounded-md"
        defaultValue={convertBooleanToString(list[0].value) as string}
      >
        {list.map((x, i) => (
          <option value={x.value as string} key={i}>
            {convertBooleanToString(x.label)}
          </option>
        ))}
      </select>
    </>
  );
};
