export interface ChatMessageProps {
  message: string;
  type: "sent" | "received" | "information";
  date: string;
}
