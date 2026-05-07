export type ResendVerificationState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; error: string };

export const resendVerificationInitialState: ResendVerificationState = {
  status: "idle",
};
