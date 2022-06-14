import { FC } from 'react';

export interface NumberInputProps {
  data: { text: string; placeholder: string }[];
}

export const NumberInput: FC<NumberInputProps> = ({ data }) => {
  return (
    <div className='w-full'>
      {data.map((d, i) => {
        return (
          <div key={i}>
            <p className='px-2 py-2 mb-5 border w-fit border-primary-600 rounded-3xl text-primary-500 font-ApfelGrotezk'>
              {d.text}
            </p>
            <input
              type='text'
              inputMode='numeric'
              placeholder={d.placeholder}
              className='float-right px-2 py-2 text-base tracking-wide text-center border-2 outline-none w-80 border-accent-700 rounded-3xl placeholder-primary-500 font-ApfelGrotezk focus:placeholder-transparent'
              id='number'
            ></input>
          </div>
        );
      })}
    </div>
  );
};
