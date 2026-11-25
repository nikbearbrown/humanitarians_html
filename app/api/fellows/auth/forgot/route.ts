import { createResetToken, RESET_MINUTES } from "@/lib/fellow-reset";
import { mailConfigured, sendMail } from "@/lib/mail";
import { passwordRequestHandler } from "@/lib/fellow-password-request";
import { claimPasswordReset, refundPasswordReset } from "@/lib/member-login-limit";
import { sql } from "@/lib/db";
import type { Query } from "@/lib/developer-access-core";

const db = sql as unknown as Query;

// The reset-email limit is shared by all server instances (database), not per instance.
export const POST = passwordRequestHandler({
  configured: mailConfigured,
  createToken: createResetToken,
  send: sendMail,
  minutes: RESET_MINUTES,
  claim: (address) => claimPasswordReset(address, db),
  refund: (address) => refundPasswordReset(address, db),
});
