import { FC } from "react";
import { ChatMessage } from "../ChatMessage";
import { IsWrittingProps } from "./types";

export const IsWritting: FC<IsWrittingProps> = () => {
  return <ChatMessage message="..." type="received" date="2022-01-01" />;
};
