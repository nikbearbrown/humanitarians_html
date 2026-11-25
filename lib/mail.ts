// lib/mail.ts
//
// Sends email through any SMTP mailbox (SMTP_USER / SMTP_PASS). For Gmail that is
// the address plus an "app password". Uses nodemailer, so it must only be
// imported from route handlers, never from middleware.
//
// If no mailbox is configured:
//   - in development only a delivery-disabled notice is printed; message bodies
//     and password-reset tokens are never logged;
//   - in production nothing is sent and an error is logged.

import nodemailer from 'nodemailer';

export type Mail = { to: string; subject: string; text: string; html: string };

export function mailConfigured(): boolean {
  return !!process.env.SMTP_USER && !!process.env.SMTP_PASS;
}

export async function sendMail(mail: Mail): Promise<'sent' | 'printed' | 'skipped'> {
  if (!mailConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Email not sent: SMTP_USER and SMTP_PASS are not set.');
      return 'skipped';
    }
    console.log('Email not sent: no SMTP mailbox is configured. Message content is not logged.');
    return 'printed';
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465, // 465 is TLS from the start; other ports upgrade with STARTTLS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
  return 'sent';
}
