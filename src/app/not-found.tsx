import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <span className="eyebrow">404 / A DIFFERENT ROAD</span>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>We couldn’t find that page or vehicle.</p>
      <Link className="button" href="/vehicles">
        Explore the collection
      </Link>
    </main>
  );
}
