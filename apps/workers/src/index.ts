import { run } from "graphile-worker";
import {
  verifyEmailAddress,
  sendEmail,
  userForgotPasswordUnregisteredEmail,
  userForgotPassword,
  userAudit,
  generatePdfFiles,
  log,
  sendTestCreationEmail,
} from "./tasks";

const main = async () => {
  const runner = await run({
    connectionString: process.env.DATABASE_URL,
    concurrency: 5,
    noHandleSignals: false,
    pollInterval: 1000,
    taskList: {
      verify_email_address: verifyEmailAddress,
      send_email: sendEmail,
      user_forgot_password_unregistered_email:
        userForgotPasswordUnregisteredEmail,
      user_forgot_password: userForgotPassword,
      user_audit: userAudit,
      log: log,
      generate_pdf_files: generatePdfFiles,
      send_test_creation_email: sendTestCreationEmail,
    },
  });
  await runner.promise;
};
main().catch(error => {
  console.log(error);
  process.exit(1);
});
