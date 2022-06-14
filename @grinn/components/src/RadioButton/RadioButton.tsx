import { FC, useState } from 'react';
import { RadioGroup } from '@headlessui/react';

export interface RadioButtonProps {
  values: { key: string; value: string }[];
}

export const RadioButton: FC<RadioButtonProps> = ({ values }) => {
  let [question, setQuestion] = useState('locataire');
  return (
    <div className='space-y-2'>
      <div className='text-lg w-fit !font-ApfelGrotezk text-primary-500'>
        <RadioGroup value={question} onChange={setQuestion}>
          <RadioGroup.Label className='flex items-center px-3 py-2 mb-5 border w-fit border-primary-500 rounded-3xl'>
            Vous êtes :
          </RadioGroup.Label>
          <div className='flex w-full'>
            {values.map((v, i) => {
              return (
                <RadioGroup.Option value={v.value}>
                  {({ checked }) => (
                    <span
                      key={i}
                      className={
                        checked
                          ? 'w-full px-5 py-2 mr-4 text-xl cursor-pointer bg-accent-900 rounded-3xl '
                          : 'w-full px-5 py-2 mr-4 text-xl cursor-pointer bg-accent-500 hover:bg-accent-900 rounded-3xl'
                      }
                    >
                      {v.value}
                    </span>
                  )}
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
