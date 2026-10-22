"use client";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
export function ContactForm({
  vehicleId,
  vehicleName,
}: {
  vehicleId?: number;
  vehicleName?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setState("sending");
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          website: form.get("website"),
          vehicleId: vehicleId ?? null,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setState("idle");
    }
  }
  if (state === "sent")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={40} />
        <h3>Your next journey is in motion.</h3>
        <p>
          We’ve received your enquiry. The Tubilex team will get back to you
          using the details you provided.
        </p>
        <button className="text-link" onClick={() => setState("idle")}>
          Send another message <ArrowUpRight size={16} />
        </button>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Full name"
            autoComplete="name"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        Phone number <span>(optional)</span>
        <input
          name="phone"
          type="tel"
          maxLength={30}
          placeholder="+255"
          autoComplete="tel"
        />
      </label>
      <label>
        What can we help you with?
        <textarea
          name="message"
          rows={4}
          required
          minLength={10}
          maxLength={3000}
          placeholder="Tell us about your next car…"
          defaultValue={
            vehicleName
              ? `Hello, I’m interested in the ${vehicleName}. Please share more information and availability.`
              : ""
          }
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="form-submit">
        <p>
          We’ll only use your details to respond
          <br />
          to your enquiry.
        </p>
        <button className="button" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              Sending <Loader2 className="spin" size={18} />
            </>
          ) : (
            <>
              Send enquiry <ArrowUpRight size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
