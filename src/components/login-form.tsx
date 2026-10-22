"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
export function LoginForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const { error } = await authClient.signIn.email({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
      if (error) {
        setError(
          "Sign-in failed. Check your email and password, or try again shortly.",
        );
        setPending(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit} className="login-form">
      <label>
        Email address
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="Your staff email"
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Your password"
        />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" disabled={pending}>
        {pending ? (
          <>
            Signing in <Loader2 className="spin" size={17} />
          </>
        ) : (
          <>
            Sign in <ArrowUpRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
