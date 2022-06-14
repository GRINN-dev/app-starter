import { FC } from 'react';

export interface TextInputProps {
  data: { label: string; placeholder: string }[];
}

export const TextInput: FC<TextInputProps> = ({ data }) => {
  return (
    <div>
      {data.map((d, i) => {
        return (
          <div key={i}>
            <label className='px-2 py-2 mb-5 border w-fit border-primary-600 rounded-3xl text-primary-500 font-ApfelGrotezk'>
              {d.label}
            </label>
            <input
              type='text'
              placeholder={d.placeholder}
              className='float-right px-2 py-2 mt-8 tracking-wide text-center border-2 outline-none w-80 border-accent-700 rounded-3xl placeholder-primary-500 font-ApfelGrotezk focus:placeholder-transparent'
            />
          </div>
        );
      })}
    </div>
  );
};
