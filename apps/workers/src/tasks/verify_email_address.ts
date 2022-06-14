import { Task } from "graphile-worker";
import { VERIFY_EMAIL_ADDRESS } from "../utils/emailTemplates";
import { SendEmailPayload } from "./send_email";

// At least 3 minutes between resending email verifications
const MIN_INTERVAL = 1000 * 60 * 3;

interface verifyEmailAddressPayload {
  id: string;
}

export const verifyEmailAddress: Task = async (
  payload,
  { addJob, withPgClient }
) => {
  const { id: userEmailId } = payload as verifyEmailAddressPayload; // on utilise l'id de l'user, dans notre requête SQL on l'identifiera par : $1
  const {
    rows: [userEmail], // on va stocker le résultat de notre requête SQL dans un tableau "userEmail"
  } = await withPgClient(pgClient =>
    pgClient.query(
      `
        select user_emails.id, email, verification_token, first_name, last_name, extract(epoch from now()) - extract(epoch from verification_email_sent_at) as seconds_since_verification_sent
        from publ.user_emails
        inner join priv.user_email_secrets
        on user_email_secrets.user_email_id = user_emails.id
        inner join publ.users
        on users.id = user_emails.user_id
        where user_emails.id = $1
        and user_emails.is_verified is false`, // si "true" un message d'erreur s'affiche, si "false" un email de confirmation pourra alors être envoyé
      [userEmailId]
    )
  );
  if (!userEmail) {
    console.warn(`non-existent userEmail (userEmailId = ${userEmailId})`);
    return;
  }

  const {
    email,
    verification_token,
    first_name,
    last_name,
    seconds_since_verification_sent,
  } = userEmail; // on sélectionne les infos dont on a besoin pour l'envoi du mail : l'email, le token, le nom, le prénom

  if (
    seconds_since_verification_sent != null &&
    seconds_since_verification_sent < MIN_INTERVAL / 1000
  ) {
    console.log("Email sent too recently");
    return;
  }

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: email,
      from: { name: "L'équipe grinn", email: "noreply@grinncredit.com" },
      subject: "Please verify your email address",
      templateId: VERIFY_EMAIL_ADDRESS,
      dynamicTemplateData: {
        token: verification_token,
        verifyLink: `http://localhost:8000/verify?id=${encodeURIComponent(
          String(userEmailId)
        )}&token=${encodeURIComponent(verification_token)}`,
        firstName: first_name,
        lastName: last_name,
      },
    },
  };
  await addJob("send_email", sendEmailPayload);
  await withPgClient(pgClient =>
    pgClient.query(
      "update priv.user_email_secrets set verification_email_sent_at = now() where user_email_id = $1",
      [userEmailId]
    )
  );
};
