import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/brand";
import { LoginForm } from "@/components/login-form";
export const metadata: Metadata = {
  title: "Staff Sign In",
  robots: { index: false, follow: false },
};
export default function LoginPage() {
  return (
    <main id="main" className="admin-login">
      <div className="login-visual">
        <Image
          src="/media/detail.webp"
          alt="Mercedes-Benz detail"
          fill
          priority
          sizes="50vw"
        />
        <Brand light />
        <div>
          <span className="eyebrow">THE TUBILEX WORKSPACE</span>
          <h1>
            Behind every
            <br />
            great journey.
          </h1>
          <p>Your collection. Your conversations. All in one place.</p>
        </div>
      </div>
      <div className="login-panel">
        <div>
          <span className="eyebrow">STAFF ACCESS</span>
          <h2>Welcome back.</h2>
          <p>Sign in to manage your vehicles and customer enquiries.</p>
          <LoginForm />
          <Link className="back-link" href="/">
            <ArrowLeft size={15} /> Back to the showroom
          </Link>
        </div>
      </div>
    </main>
  );
}
