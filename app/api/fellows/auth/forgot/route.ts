import { createResetToken, RESET_MINUTES } from "@/lib/fellow-reset";
import { mailConfigured, sendMail } from "@/lib/mail";
import { passwordRequestHandler } from "@/lib/fellow-password-request";
export const POST = passwordRequestHandler({
  configured: mailConfigured,
  createToken: createResetToken,
  send: sendMail,
  minutes: RESET_MINUTES,
});
