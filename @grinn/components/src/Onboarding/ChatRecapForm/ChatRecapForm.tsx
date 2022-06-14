import { FC } from "react";
import { ChatRecapFormProps } from "./types";

export const ChatRecapForm: FC<ChatRecapFormProps> = ({ template }) => {
  return (
    <div className="flex justify-end w-full mt-4">
      <div className={`inline  w-2/3 mt-1 ml-auto  text-right`}>
        {template.map((item, i) => {
          if (typeof item === "object") {
            return (
              <a
                href={`#${item.href}`}
                className={`center px-3 py-1 mx-1  rounded-3xl  border text-accent-800 bg-white border-accent-800 hover:bg-gray-200 leading-loose`}
              >
                {item.data}
              </a>
            );
          }
          return <span>{item}</span>;
        })}
      </div>
    </div>
  );
};
