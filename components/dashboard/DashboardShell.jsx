"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiBarChart2, FiBox, FiClipboard, FiGrid, FiHeart, FiHome, FiList, FiLogOut, FiMenu,
  FiPlusSquare, FiShoppingBag, FiUser, FiUsers, FiX,
} from "react-icons/fi";
import Logo from "../Logo";
import Avatar from "../Avatar";
import ThemeToggle from "../ThemeToggle";
import RequireAuth from "../RequireAuth";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { ROLE_LABEL } from "@/lib/constants";

const menus = {
  customer: [
    { href: "/dashboard/my-rentals", label: "My Rentals", icon: FiShoppingBag },
    { href: "/dashboard/favorites", label: "Favorites", icon: FiHeart },
    { href: "/dashboard/profile", label: "Profile", icon: FiUser },
  ],
  owner: [
    { href: "/dashboard", label: "Overview", icon: FiBarChart2, exact: true },
    { href: "/dashboard/add-equipment", label: "Add Equipment", icon: FiPlusSquare },
    { href: "/dashboard/my-equipment", label: "My Equipment", icon: FiBox },
    { href: "/dashboard/equipment-rentals", label: "My Equipment Rental", icon: FiClipboard },
    { href: "/dashboard/profile", label: "My Profile", icon: FiUser },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: FiBarChart2, exact: true },
    { href: "/dashboard/users", label: "All Users", icon: FiUsers },
    { href: "/dashboard/all-equipment", label: "All Equipment", icon: FiGrid },
    { href: "/dashboard/all-rentals", label: "All Rentals", icon: FiList },
    { href: "/dashboard/profile", label: "My Profile", icon: FiUser },
  ],
};

function Sidebar({ items, pathname, onNavigate }) {
  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${active ? "bg-primary text-primary-content shadow-md shadow-primary/20" : "hover:bg-base-200"}`}>
            <Icon size={18} /> {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Shell({ children }) {
  const { user, role } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const items = menus[role] || menus.customer;

  const logout = async () => {
    await authClient.signOut();
    clearToken();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const sidebarBody = (
    <>
      <div className="flex h-[72px] items-center justify-between border-b border-base-300 px-5">
        <Logo />
        <button className="btn btn-ghost btn-circle btn-sm lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><FiX size={18} /></button>
      </div>
      <div className="flex items-center gap-3 border-b border-base-300 px-5 py-5">
        <Avatar name={user?.name} src={user?.image} size={46} />
        <div className="min-w-0">
          <p className="truncate font-bold leading-tight">{user?.name}</p>
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{ROLE_LABEL[role]}</span>
        </div>
      </div>
      <Sidebar items={items} pathname={pathname} onNavigate={() => setOpen(false)} />
      <div className="space-y-1 border-t border-base-300 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold hover:bg-base-200"><FiHome size={18} /> Back to website</Link>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-error hover:bg-error/10"><FiLogOut size={18} /> Logout</button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-base-200">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-base-300 bg-base-100 lg:flex">{sidebarBody}</aside>

      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-base-100 transition-transform lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>{sidebarBody}</aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-base-300 bg-base-100/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-circle lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><FiMenu size={22} /></button>
            <h1 className="text-lg font-extrabold tracking-tight">{ROLE_LABEL[role]} Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard/profile" aria-label="Profile"><Avatar name={user?.name} src={user?.image} size={38} /></Link>
          </div>
        </header>
        <main className="w-full p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardShell({ children }) {
  return (
    <RequireAuth>
      <Shell>{children}</Shell>
    </RequireAuth>
  );
}
