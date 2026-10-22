"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, Phone } from "lucide-react";
import { Brand } from "./brand";
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className={pathname === "/" ? "active" : ""} href="/">
            Home
          </Link>
          <Link
            className={pathname.startsWith("/vehicles") ? "active" : ""}
            href="/vehicles"
          >
            Our vehicles
          </Link>
          <Link href="/#about">About us</Link>
          <Link href="/#services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="button button-small header-cta" href="/contact">
          Let’s talk <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ["Home", "/"],
            ["Our vehicles", "/vehicles"],
            ["About us", "/#about"],
            ["Services", "/#services"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <a href="tel:+255788835182">
            <Phone size={16} /> +255 788 835 182
          </a>
        </nav>
      )}
    </header>
  );
}
