"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { resendVerificationAction } from "@/actions/auth";
import { resendVerificationInitialState } from "@/actions/auth-state";
import { Button } from "@/components/ui/button";

type ResendVerificationButtonProps = {
  email: string;
  className?: string;
};

export function ResendVerificationButton({
  email,
  className,
}: ResendVerificationButtonProps) {
  const [state, formAction, pending] = useActionState(
    resendVerificationAction,
    resendVerificationInitialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Verification email sent. Check your inbox.");
    } else if (state.status === "error") {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className={className}>
      <input type="hidden" name="email" value={email} />
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={pending}
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Resend verification email"
        )}
      </Button>
    </form>
  );
}
