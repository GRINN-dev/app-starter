import { FC } from "react";
import { ChatMessageProps } from "./types";

export const ChatMessage: FC<ChatMessageProps> = ({ message, type, date }) => {
  return (
    <div className="w-full">
      <div
        className={`flex w-2/3 mt-1 ${
          type === "information"
            ? "mx-auto justify-center"
            : type === "sent"
            ? "ml-auto justify-end"
            : "mr-auto justify-start"
        }`}
      >
        <div
          className={` ${
            type === "information"
              ? "text-gray-500 uppercase tracking-wider text-xs"
              : type === "sent"
              ? "px-4 py-2 text-white rounded-3xl bg-accent-500"
              : "px-4 py-2 text-white rounded-3xl bg-primary-500"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};
