
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          defaultValue="user@example.com"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline" prefetch={false}>
            Forgot your password?
          </Link>
        </div>
        <Input id="password" type="password" defaultValue="password" />
      </div>
      <Link href="/dashboard" passHref legacyBehavior>
        <Button asChild className="w-full">
          <a>Sign In</a>
        </Button>
      </Link>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="#" className="underline" prefetch={false}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
