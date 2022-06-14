import { Task } from "graphile-worker";
import { USER_AUDIT } from "../utils/emailTemplates";
import { SendEmailPayload } from "./send_email";

/* For tracking account actions */

/*
type AccountAction =
  | "linked_account" //
  | "unlinked_account" //
  | "changed_password" //
  | "reset_password" //
  | "added_email" //
  | "removed_email"; //
 */

type UserAuditPayload =
  | {
      type: "reset_password";
      user_id: string;
      current_user_id: string;
    }
  | {
      type: "change_password";
      user_id: string;
      current_user_id: string;
    };

export const userAudit: Task = async (
  rawPayload,
  { addJob, withPgClient, job }
) => {
  const payload: UserAuditPayload = rawPayload as any;

  let subject: string;
  let actionDescription: string;

  switch (payload.type) {
    case "reset_password": {
      subject = `You reset your password`;
      actionDescription = `You reset your password.`;
      break;
    }
    case "change_password": {
      subject = `You changed your password`;
      actionDescription = `You changed your password.`;
      break;
    }
    default: {
      // Ensure we've handled all cases above
      const neverPayload: never = payload;
      console.error(
        `Audit action '${(neverPayload as any).type}' not understood`
      );
      return;
    }
  }

  const {
    rows: [user],
  } = await withPgClient(client =>
    client.query<{
      id: string;
      created_at: Date;
    }>("select * from publ.users where id = $1", [payload.user_id])
  );

  if (!user) {
    console.error(
      `User '${payload.user_id}' no longer exists. (Tried to audit: ${actionDescription})`
    );
    return;
  }
  if (Math.abs(+user.created_at - +job.created_at) < 2) {
    console.info(
      `Not sending audit announcement for user '${payload.user_id}' because it occurred immediately after account creation. (Tried to audit: ${actionDescription})`
    );
    return;
  }
  const { rows: userEmails } = await withPgClient(client =>
    client.query<{
      id: string;
      user_id: string;
      email: string;
      is_verified: boolean;
      is_primary: boolean;
      created_at: Date;
      updated_at: Date;
    }>(
      "select * from publ.user_emails where user_id = $1 and is_verified is true order by id asc",
      [payload.user_id]
    )
  );

  if (userEmails.length === 0) {
    throw new Error("Could not find emails for this user");
  }

  const emails = userEmails.map(e => e.email);

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: emails,
      from: { name: "L'équipe grinn", email: "noreply@grinncredit.com" },
      subject: subject,
      templateId: USER_AUDIT,
      dynamicTemplateData: {
        actionDescription,
      },
    },
  };
  await addJob("send_email", sendEmailPayload);
};
