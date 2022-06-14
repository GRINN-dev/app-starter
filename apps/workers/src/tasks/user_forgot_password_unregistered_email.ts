import { Task } from "graphile-worker";
import { USER_FORGOT_PASSWORD_UNREGISTERED_EMAIL } from "../utils/emailTemplates";
import { SendEmailPayload } from "./send_email";

interface UserForgotPasswordUnregisteredEmailPayload {
  email: string;
}

export const userForgotPasswordUnregisteredEmail: Task = async (
  payload,
  { addJob }
) => {
  const { email } = payload as UserForgotPasswordUnregisteredEmailPayload;

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: email,
      from: { name: "L'équipe grinn", email: "noreply@grinncredit.com" },
      subject: "Password reset request failed: you don't have a grinn account",
      templateId: USER_FORGOT_PASSWORD_UNREGISTERED_EMAIL,
    },
  };
  await addJob("send_email", sendEmailPayload);
};
