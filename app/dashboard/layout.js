import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = { title: { default: "Dashboard", template: "%s | Dashboard | GearLoop" } };

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
