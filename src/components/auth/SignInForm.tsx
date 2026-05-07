"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signInWithCredentials, signInWithGitHub } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SignInInput, signInSchema } from "@/lib/schemas/auth";

export function SignInForm() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await signInWithCredentials(data);
    if (!result.success) {
      toast.error(result.error);
    }
  });

  const { isSubmitting, isDirty, isValid } = form.formState;
  const isValidBtn = !isSubmitting || isDirty || isValid;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="youremail@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isValidBtn} className="w-full">
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="relative my-2 flex items-center">
          <span className="h-px flex-1 bg-border" />
          <span className="px-3 text-xs uppercase tracking-wider text-muted-foreground">
            Or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
      </form>

      <form action={signInWithGitHub}>
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={isSubmitting}
        >
          <Image
            src="/github.svg"
            alt=""
            width={16}
            height={16}
            className="dark:invert"
          />
          Sign in with GitHub
        </Button>
      </form>
    </Form>
  );
}
