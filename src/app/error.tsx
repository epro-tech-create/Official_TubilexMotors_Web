"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="error-page">
      <span className="eyebrow">A SMALL DETOUR</span>
      <h1>
        We’ll be back
        <br />
        on the road shortly.
      </h1>
      <p>
        We couldn’t load this page. Try again, or call us on +255 788 835 182.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
