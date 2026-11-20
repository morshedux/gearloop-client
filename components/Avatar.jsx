import { initials } from "@/lib/format";

export default function Avatar({ name, src, size = 40, className = "" }) {
  const style = { width: size, height: size, fontSize: size * 0.38 };
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name || "User"} style={style} className={`rounded-full object-cover shrink-0 ${className}`} referrerPolicy="no-referrer" />;
  }
  return (
    <span style={style} className={`inline-flex items-center justify-center rounded-full bg-primary text-primary-content font-bold shrink-0 ${className}`}>
      {initials(name)}
    </span>
  );
}
