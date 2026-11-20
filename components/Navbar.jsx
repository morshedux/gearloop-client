"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiGrid, FiLogOut, FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";

const links = [
  { href: "/", label: "Home" },
  { href: "/equipment", label: "All Equipment" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const logout = async () => {
    await authClient.signOut();
    clearToken();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const navLinks = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} className={`font-semibold ${isActive(l.href) ? "text-primary" : ""}`}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <FiMenu size={22} />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {navLinks}
              {!user && !loading && (
                <>
                  <li><Link href="/login">Login</Link></li>
                  <li><Link href="/register">Register</Link></li>
                </>
              )}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="menu menu-horizontal gap-1 px-1">{navLinks}</ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {loading ? (
            <span className="skeleton-line h-10 w-24" />
          ) : user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary btn-sm sm:btn-md hidden sm:inline-flex">
                <FiGrid /> Dashboard
              </Link>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Account menu">
                  <Avatar name={user.name} src={user.image} size={38} />
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                  <li className="menu-title px-3 py-2">
                    <span className="block font-bold text-base-content">{user.name}</span>
                    <span className="block text-xs font-normal muted truncate">{user.email}</span>
                  </li>
                  <li><Link href="/dashboard"><FiGrid /> Dashboard</Link></li>
                  <li><button onClick={logout}><FiLogOut /> Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md hidden sm:inline-flex">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
