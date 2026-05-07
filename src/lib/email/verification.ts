import { APP_NAME } from "@/lib/constants";

import { FROM_EMAIL, resend } from "./client";

import "server-only";

type SendVerificationEmailArgs = {
  to: string;
  verifyUrl: string;
  name?: string | null;
};

export async function sendVerificationEmail({
  to,
  verifyUrl,
  name,
}: SendVerificationEmailArgs) {
  const greeting = name ? `Hi ${name},` : "Hi,";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0a0a0a;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">Verify your email</h1>
      <p style="margin: 0 0 12px; line-height: 1.5;">${greeting}</p>
      <p style="margin: 0 0 20px; line-height: 1.5;">
        Thanks for signing up for ${APP_NAME}. Click the button below to verify your email address and activate your account.
      </p>
      <p style="margin: 0 0 24px;">
        <a href="${verifyUrl}"
           style="display: inline-block; background: #0a0a0a; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 500;">
          Verify email
        </a>
      </p>
      <p style="margin: 0 0 8px; color: #525252; font-size: 13px;">
        Or copy and paste this URL into your browser:
      </p>
      <p style="margin: 0 0 24px; color: #525252; font-size: 13px; word-break: break-all;">
        ${verifyUrl}
      </p>
      <p style="margin: 0; color: #737373; font-size: 12px;">
        This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Verify your email for ${APP_NAME}`,
    html,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}
