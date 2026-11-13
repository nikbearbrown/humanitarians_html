import { NextRequest, NextResponse } from "next/server";
import { sameOrigin } from "@/lib/timesheets/session";
type Reset = { token: string; name: string; email: string };
type Mail = { to: string; subject: string; text: string; html: string };
type Dependencies = {
  configured: () => boolean;
  createToken: (email: string) => Promise<Reset | null>;
  send: (mail: Mail) => Promise<"sent" | "printed" | "skipped">;
  minutes: number;
};
// Best-effort per-instance limit. A shared production limiter remains a rollout
// prerequisite for broad onboarding. Failed sends never count as successful.
export function passwordRequestHandler(deps: Dependencies) {
  const lastCompleted = new Map<string, number>(),
    pending = new Set<string>();
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
      ownsPending = false;
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
      if (Date.now() - (lastCompleted.get(address) || 0) < 60000)
        return reply();
      if (pending.has(address))
        return NextResponse.json(
          { error: "A request is already in progress. Please wait." },
          { status: 429, headers },
        );
      pending.add(address);
      ownsPending = true;
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
        if (result !== "sent") return unavailable();
      }
      lastCompleted.set(address, Date.now());
      return reply();
    } catch (error) {
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
