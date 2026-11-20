import Link from "next/link";

export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#0f766e" />
      <path d="M32 14a18 18 0 1 0 12.7 30.7" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M44.7 44.7 52 38M44.7 44.7l-1.6-9.9" fill="none" stroke="#f5a524" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="5" fill="#f5a524" />
    </svg>
  );
}

// Same logo + name style used in the navbar, footer and dashboard.
export default function Logo({ href = "/", light = false }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="GearLoop home">
      <LogoMark />
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-white" : "text-base-content"}`}>
        Gear<span className="text-primary">Loop</span>
      </span>
    </Link>
  );
}
