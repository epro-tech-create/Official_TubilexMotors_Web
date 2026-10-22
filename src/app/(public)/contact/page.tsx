import type { Metadata } from "next";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Let’s Talk" };
export default function ContactPage() {
  return (
    <main id="main" className="contact-page container">
      <div className="page-intro">
        <span className="eyebrow">GOOD JOURNEYS START WITH A CONVERSATION</span>
        <h1>
          Let’s talk about
          <br />
          <em>your next drive.</em>
        </h1>
      </div>
      <div className="contact-grid">
        <div className="contact-details">
          <p>
            Have your eye on a car? Looking for something specific? We’re here
            to help you take the next step.
          </p>
          <a href="tel:+255788835182">
            <Phone />
            <span>
              <small>GIVE US A CALL</small>+255 788 835 182
            </span>
            <ArrowUpRight size={17} />
          </a>
          <a href="mailto:tubilexmotorslimited@gmail.com">
            <Mail />
            <span>
              <small>DROP US A LINE</small>tubilexmotorslimited@gmail.com
            </span>
            <ArrowUpRight size={17} />
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mbezi+Luis+Dar+es+Salaam"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin />
            <span>
              <small>COME SAY HELLO</small>Old Morogoro Road, Mbezi Luis
              <br />
              Ubungo, Dar es Salaam, Tanzania
            </span>
            <ArrowUpRight size={17} />
          </a>
          <a
            href="https://wa.me/255788835182"
            target="_blank"
            rel="noreferrer"
            className="button button-dark"
          >
            Chat on WhatsApp <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="contact-form-wrap">
          <h2>
            A little about you.
            <br />A little about your next car.
          </h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
