import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <span className="eyebrow">THE NEXT CHAPTER STARTS HERE</span>
            <h2>
              Your next journey.
              <br />
              <span>Our next conversation.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="circle-link"
            aria-label="Contact Tubilex Motors"
          >
            <ArrowUpRight size={38} />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <Brand light />
            <p>
              Cars without borders.
              <br />
              Possibilities without limits.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/vehicles">Our vehicles</Link>
            <Link href="/#about">Our story</Link>
            <Link href="/#services">What we do</Link>
            <Link href="/contact">Get in touch</Link>
          </div>
          <div>
            <h3>Visit our showroom</h3>
            <p>
              Old Morogoro Road, Mbezi Luis
              <br />
              Ubungo, Dar es Salaam
              <br />
              Tanzania
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mbezi+Luis+Dar+es+Salaam"
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <h3>Let’s talk</h3>
            <a href="tel:+255788835182">+255 788 835 182</a>
            <a href="mailto:tubilexmotorslimited@gmail.com">
              tubilexmotorslimited@gmail.com
            </a>
            <a
              href="https://wa.me/255788835182"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Tubilex Motors. All rights reserved.
          </span>
          <span>
            Dar es Salaam, Tanzania <span className="status-dot" />
          </span>
          <Link href="/admin">
            Staff access <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
