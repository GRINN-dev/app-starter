import { Task } from "graphile-worker";
import { SendEmailPayload } from "./send_email";

export const sendTestCreationEmail: Task = async (payload, { addJob }) => {
  const typedPayload = payload as { email: string; test_string: string };

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: typedPayload.email,
      from: "jojo@grinn.tech",
      subject: "Test creation email",
      text: typedPayload.test_string,
    },
  };
  await addJob("send_email", sendEmailPayload);
};
