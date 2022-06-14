import { FC } from "react";
import { ChatUserInputProps } from "./types";

export const ChatUserInput: FC<ChatUserInputProps> = ({ input, anchor }) => {
  return (
    <div className="w-full">
      <div className={`flex w-2/3 mt-1 ml-auto justify-end`}>
        <div className="flex flex-col items-end">
          <input
            id="anchor"
            className={`peer border-2 ring-0 focus:ring-accent-500  px-4 py-2 text-white focus:text-accent-500 rounded-3xl bg-accent-500 focus:bg-white focus:border-accent-500  caret-accent-500 `}
          />
          <label htmlFor={anchor} className={`hidden peer-focus:block`}>
            Appuyer sur entrée pour valider votre saisie
          </label>
        </div>
      </div>
    </div>
  );
};
