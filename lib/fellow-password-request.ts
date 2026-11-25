import { NextRequest, NextResponse } from "next/server";
import { sameOrigin } from "@/lib/timesheets/session";
type Reset = { token: string; name: string; email: string };
type Mail = { to: string; subject: string; text: string; html: string };
type Dependencies = {
  configured: () => boolean;
  createToken: (email: string) => Promise<Reset | null>;
  send: (mail: Mail) => Promise<"sent" | "printed" | "skipped">;
  minutes: number;
  // Shared limit across server instances (lib/member-login-limit.ts): claim one
  // email for the address (false = over the limit), or give the claim back.
  claim: (address: string) => Promise<boolean>;
  refund: (address: string) => Promise<void>;
};
// The limit is held in the database, so every instance enforces the same count.
// Over the limit, the reply is the same neutral "accepted" (it does not reveal
// whether the address exists) and nothing is sent. Failed sends are refunded so
// they never count. Unknown addresses count too, to slow enumeration. If the
// limit cannot be checked, the request fails closed. The in-flight set below only
// stops one instance from sending the same email twice at once.
export function passwordRequestHandler(deps: Dependencies) {
  const pending = new Set<string>();
  return async (req: NextRequest) => {
    const headers = { "Cache-Control": "private, no-store" };
    const unavailable = () =>
      NextResponse.json(
        {
          error:
            "Could not send the email right now. Try again in a few minutes.",
        },
        { status: 503, headers },
      );
    if (!sameOrigin(req))
      return NextResponse.json(
        { error: "Use the password-reset form on this site." },
        { status: 403, headers },
      );
    let address = "",
      ownsPending = false,
      claimed = false;
    try {
      const { email } = await req.json();
      address = String(email || "")
        .trim()
        .toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address))
        return NextResponse.json(
          { error: "Enter a valid email address" },
          { status: 400, headers },
        );
      if (!deps.configured()) return unavailable();
      const reply = () =>
        NextResponse.json({ success: true, mail: "accepted" }, { headers });
      if (pending.has(address))
        return NextResponse.json(
          { error: "A request is already in progress. Please wait." },
          { status: 429, headers },
        );
      pending.add(address);
      ownsPending = true;
      if (!(await deps.claim(address))) return reply();
      claimed = true;
      const reset = await deps.createToken(address);
      if (reset) {
        const base =
          process.env.APP_URL ||
          (process.env.NODE_ENV === "production"
            ? "https://www.humanitarians.ai"
            : req.nextUrl.origin);
        const link = `${base}/fellows/reset-password?token=${encodeURIComponent(reset.token)}`;
        const result = await deps.send({
          to: reset.email,
          subject: "Reset your Humanitarians AI password",
          text: `Hi ${reset.name},\n\nSomeone asked to reset the password for your Humanitarians AI fellow account.\nOpen this link to choose a new password (it works once and expires in ${deps.minutes} minutes):\n\n${link}\n\nIf this wasn't you, you can ignore this email; your password stays the same.`,
          html: `<p>Hi ${escapeHtml(reset.name)},</p><p>Someone asked to reset the password for your Humanitarians AI fellow account.</p><p><a href="${escapeHtml(link)}">Reset password</a></p><p>The link works once and expires in ${deps.minutes} minutes. If this wasn't you, you can ignore this email; your password stays the same.</p>`,
        });
        if (result !== "sent") {
          await deps.refund(address).catch(() => undefined);
          return unavailable();
        }
      }
      return reply();
    } catch (error) {
      if (claimed) await deps.refund(address).catch(() => undefined);
      const code = (error as { code?: unknown })?.code;
      // Never log token URLs, message bodies, addresses, SMTP responses or secrets.
      console.error("forgot password failed", {
        code:
          typeof code === "string" &&
          [
            "EAUTH",
            "ECONNECTION",
            "ETIMEDOUT",
            "ESOCKET",
            "EENVELOPE",
          ].includes(code)
            ? code
            : "REQUEST_FAILED",
      });
      return unavailable();
    } finally {
      if (ownsPending) pending.delete(address);
    }
  };
}
function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
