import { Task } from "graphile-worker";
import { USER_FORGOT_PASSWORD } from "../utils/emailTemplates";
import { SendEmailPayload } from "./send_email";

interface UserForgotPasswordPayload {
  id: string;
  email: string;
  token: string;
}

export const userForgotPassword: Task = async (
  payload,
  { addJob, withPgClient }
) => {
  const { id: userId, email, token } = payload as UserForgotPasswordPayload;
  const {
    rows: [user],
  } = await withPgClient(pgClient =>
    pgClient.query(
      `
        select users.*
        from publ.users
        where id = $1
      `,
      [userId]
    )
  );
  if (!user) {
    console.error("User not found");
    return;
  }
  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: email,
      from: { name: "L'équipe grinn", email: "noreply@grinncredit.com" },
      subject: "Password reset",
      templateId: USER_FORGOT_PASSWORD,
      dynamicTemplateData: {
        token,
        verifyLink: `http://localhost:8000/verify?id=${encodeURIComponent(
          String(userId)
        )}&token=${encodeURIComponent(token)}`,
      },
    },
  };
  await addJob("send_email", sendEmailPayload);
};
