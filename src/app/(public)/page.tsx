import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Globe2,
  KeyRound,
  Wrench,
  MoveRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { getVehicles } from "@/lib/inventory";
import { Inventory } from "@/components/inventory";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const vehicles = await getVehicles();
  return (
    <main id="main">
      <section className="hero">
        <Image
          className="hero-image"
          src="/media/hero.webp"
          alt="A sports car in a dramatic dark studio"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-kicker">
            <span className="orange-dot" /> CARS WITHOUT BORDERS{" "}
            <span className="kicker-line" />
          </div>
          <h1>
            More than a car.
            <br />A new <span>chapter.</span>
          </h1>
          <p>
            For the everyday. The extraordinary.
            <br />
            And every road you haven’t taken yet.
          </p>
          <Link className="button" href="/vehicles">
            Find your next drive <ArrowUpRight size={20} />
          </Link>
          <div className="hero-bottom">
            <a href="#collection" className="hero-scroll">
              <span>
                <ArrowDown size={16} />
              </span>
              SCROLL TO EXPLORE
            </a>
            <div className="hero-location">
              <MapPin size={15} />
              <span>
                DAR ES SALAAM, TANZANIA
                <br />
                <b>YOUR JOURNEY STARTS HERE</b>
              </span>
            </div>
          </div>
        </div>
        <span className="hero-side-label">
          DRIVEN BY POSSIBILITY — TUBILEX MOTORS
        </span>
      </section>
      <div className="brand-strip">
        <div className="container brand-strip-inner">
          <span>
            A WORLD OF POSSIBILITIES.
            <br />
            <b>ONE DESTINATION.</b>
          </span>
          <span className="marque mercedes-mark">Mercedes-Benz</span>
          <span className="marque toyota-mark">TOYOTA</span>
          <span className="marque jeep-mark">
            Jeep<span>®</span>
          </span>
          <span className="marque honda-mark">HONDA</span>
          <span className="strip-note">
            Explore our
            <br />
            vehicle collection <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      <section id="collection" className="section collection-section">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">01 / THE COLLECTION</span>
                <h2>
                  Find a drive that
                  <br />
                  feels like <em>you.</em>
                </h2>
              </div>
              <p>
                Different roads. Different ambitions.
                <br />
                Explore a collection with your next
                <br className="desktop-break" /> chapter in mind.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Inventory vehicles={vehicles} compact />
          </Reveal>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="about-photo">
          <Image
            src="/media/detail.webp"
            alt="Close-up of a Mercedes-Benz grille"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <div className="photo-caption">
            <span>TUBILEX MOTORS</span>
            <span>BUILT ON TRUST. DRIVEN BY YOU.</span>
          </div>
        </div>
        <div className="about-content">
          <Reveal>
            <span className="eyebrow">02 / A LITTLE ABOUT US</span>
            <h2>
              Great cars.
              <br />
              Even better
              <br />
              <em>connections.</em>
            </h2>
            <p>
              A car is part of your story. At Tubilex Motors, we’re here to help
              you find the one that fits — with honest conversations and a
              personal approach.
            </p>
            <p>
              From our home in Mbezi Luis, Dar es Salaam, we connect you with
              vehicles and guide you through the journey, from first enquiry to
              the road ahead.
            </p>
            <Link href="/contact" className="text-link">
              Meet your next motoring partner <ArrowUpRight size={18} />
            </Link>
            <div className="about-values">
              <span>
                <ShieldCheck size={20} /> A personal approach
              </span>
              <span>
                <Globe2 size={20} /> A world of choice
              </span>
            </div>
          </Reveal>
        </div>
      </section>
      <section id="services" className="section services-section">
        <div className="container">
          <Reveal>
            <div className="section-heading">
              <div>
                <span className="eyebrow">03 / MORE THAN THE KEYS</span>
                <h2>
                  With you.
                  <br />
                  <em>Every step.</em>
                </h2>
              </div>
              <p>
                Finding your car is just the beginning.
                <br />
                We help make the rest of the journey
                <br />
                feel a little easier.
              </p>
            </div>
          </Reveal>
          <div className="services-grid">
            {[
              {
                n: "01",
                icon: KeyRound,
                title: "Find your perfect fit",
                text: "Explore our vehicles, compare your options and arrange a viewing. We’ll help you find a car that fits your life.",
                label: "Explore the collection",
                href: "/vehicles",
              },
              {
                n: "02",
                icon: Globe2,
                title: "Beyond borders",
                text: "Have a particular car in mind? Talk to us about vehicle sourcing, import guidance and the steps to get it here.",
                label: "Talk about importing",
                href: "/contact?subject=import",
              },
              {
                n: "03",
                icon: Wrench,
                title: "Keep moving forward",
                text: "From registration guidance to maintenance and spare-parts enquiries, speak with our team about support for your next chapter.",
                label: "How can we help?",
                href: "/contact?subject=support",
              },
            ].map((s) => (
              <Reveal key={s.n} delay={Number(s.n) * 70}>
                <Link href={s.href} className="service-card">
                  <div className="service-top">
                    <s.icon size={30} strokeWidth={1.3} />
                    <span>/{s.n}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="service-link">
                    {s.label}
                    <MoveRight size={20} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="journey-banner">
        <Image
          src="/media/pickup.webp"
          alt="A pickup truck ready for the road"
          fill
          sizes="100vw"
        />
        <div className="journey-overlay" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">THE ROAD IS CALLING</span>
            <h2>
              Wherever life takes you.
              <br />
              <em>Make it your drive.</em>
            </h2>
            <Link href="/vehicles" className="button">
              Explore our vehicles <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-grid">
          <Reveal>
            <span className="eyebrow">04 / GOOD QUESTIONS</span>
            <h2>
              A little clarity.
              <br />
              <em>A lot of confidence.</em>
            </h2>
            <p>
              Everything starts with a conversation.
              <br />
              Here are a few answers to get you going.
            </p>
            <Link href="/contact" className="text-link">
              Ask us something else <ArrowUpRight size={17} />
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <FAQ />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
