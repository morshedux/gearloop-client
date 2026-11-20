import Link from "next/link";
import Logo from "../Logo";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="container-x py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl shadow-primary/5 lg:grid-cols-2">
        <div className="relative hidden bg-secondary lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/equipment/excavator.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061a26] via-[#061a26]/60 to-transparent" />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <Logo light />
            <div>
              <h2 className="text-3xl font-extrabold leading-tight">Everything you need, one rental away.</h2>
              <p className="mt-3 text-white/75">Join GearLoop to rent equipment or earn from yours with secure payments and verified owners.</p>
            </div>
          </div>
        </div>

        <div className="p-7 sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm muted">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <p className="mt-7 text-center text-sm muted">{footer}</p>
        </div>
      </div>
    </div>
  );
}

export function GoogleButton({ onClick, loading }) {
  return (
    <button type="button" onClick={onClick} disabled={loading} className="btn btn-outline w-full border-base-300">
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
        <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z" />
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
      </svg>
      Continue with Google
    </button>
  );
}

export const Divider = () => (
  <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest muted">
    <span className="h-px flex-1 bg-base-300" /> or <span className="h-px flex-1 bg-base-300" />
  </div>
);

export const AuthLink = ({ href, children }) => (
  <Link href={href} className="font-bold text-primary hover:underline">{children}</Link>
);
