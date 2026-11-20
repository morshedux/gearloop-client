import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Logo from "./Logo";
import { CATEGORIES } from "@/lib/constants";

const socials = [
  { icon: FaXTwitter, label: "X", href: "https://x.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-xs text-sm leading-relaxed text-neutral-content/75">
            A trusted marketplace where owners list equipment and customers rent it with transparent pricing and secure payments.
          </p>
          <div className="flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary hover:text-primary-content">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
          <ul className="space-y-2.5 text-sm text-neutral-content/75">
            <li><Link className="hover:text-primary" href="/">Home</Link></li>
            <li><Link className="hover:text-primary" href="/equipment">All Equipment</Link></li>
            <li><Link className="hover:text-primary" href="/how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-primary" href="/about">About Us</Link></li>
            <li><Link className="hover:text-primary" href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Categories</h3>
          <ul className="space-y-2.5 text-sm text-neutral-content/75">
            {CATEGORIES.map((c) => (
              <li key={c}><Link className="hover:text-primary" href={`/equipment?category=${encodeURIComponent(c)}`}>{c}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-neutral-content/75">
            <li className="flex items-start gap-3"><FiMapPin className="mt-0.5 shrink-0 text-primary" /> House 21, Road 7, Banani, Dhaka 1213</li>
            <li className="flex items-center gap-3"><FiPhone className="shrink-0 text-primary" /> +880 1700 000 000</li>
            <li className="flex items-center gap-3"><FiMail className="shrink-0 text-primary" /> hello@gearloop.app</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-neutral-content/65 sm:flex-row">
          <p>© {new Date().getFullYear()} GearLoop. All rights reserved.</p>
          <p>Secure payments powered by Stripe.</p>
        </div>
      </div>
    </footer>
  );
}
