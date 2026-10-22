import Link from "next/link";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Tubilex Motors home"
    >
      <span className="brand-symbol">
        <i />
        <i />
        <i />
      </span>
      <span>
        TUBILEX<span className="brand-sub">M O T O R S</span>
      </span>
    </Link>
  );
}
