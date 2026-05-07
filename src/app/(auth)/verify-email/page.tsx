import { MailCheck } from "lucide-react";
import Link from "next/link";

import { ResendVerificationButton } from "@/components/auth/ResendVerificationButton";

type VerifyEmailPageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MailCheck className="size-6" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Verify your email
      </h1>
      <p className="text-sm text-muted-foreground">
        {email ? (
          <>
            We sent a verification link to{" "}
            <span className="font-medium text-foreground">{email}</span>. Click
            the link in the email to activate your account.
          </>
        ) : (
          "Check your inbox for a verification link to activate your account."
        )}
      </p>
      {email ? (
        <ResendVerificationButton email={email} className="w-full" />
      ) : null}
      <Link
        href="/sign-in"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Back to sign in
      </Link>
    </div>
  );
}
