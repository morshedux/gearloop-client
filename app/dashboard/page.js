"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiBox, FiCheckCircle, FiClock, FiDollarSign, FiShoppingBag, FiTrendingUp, FiUsers } from "react-icons/fi";
import Loader from "@/components/Loader";
import { Card, PageHeader, StatCard } from "@/components/dashboard/ui";
import { Donut, HorizontalBars, MonthlyArea, MonthlyBars } from "@/components/dashboard/Charts";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { money } from "@/lib/format";

function AdminOverview() {
  const { data, loading, error } = useFetch(() => api("/analytics/admin"));
  if (loading) return <Loader label="Loading analytics..." />;
  if (error) return <div className="alert alert-error">{error}</div>;
  const t = data.totals;
  return (
    <>
      <PageHeader title="Platform overview" subtitle="Live performance across users, equipment, bookings and revenue." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total users" value={t.totalUsers} icon={FiUsers} />
        <StatCard label="Total equipment" value={t.totalEquipment} icon={FiBox} tone="info" />
        <StatCard label="Total bookings" value={t.totalBookings} icon={FiShoppingBag} tone="accent" />
        <StatCard label="Pending approvals" value={t.pendingApprovals} icon={FiClock} tone="accent" />
        <StatCard label="Completed rentals" value={t.completedRentals} icon={FiCheckCircle} tone="success" />
        <StatCard label="Total revenue" value={money(t.totalRevenue)} icon={FiDollarSign} tone="success" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Monthly bookings"><MonthlyArea data={data.monthly} dataKey="bookings" label="Bookings" /></Card>
        <Card title="Monthly revenue"><MonthlyBars data={data.monthly} dataKey="revenue" label="Revenue" money /></Card>
        <Card title="Equipment by category"><Donut data={data.byCategory} /></Card>
        <Card title="Equipment approval status"><Donut data={data.byStatus} /></Card>
      </div>
    </>
  );
}

function OwnerOverview() {
  const { data, loading, error } = useFetch(() => api("/analytics/owner"));
  if (loading) return <Loader label="Loading analytics..." />;
  if (error) return <div className="alert alert-error">{error}</div>;
  const t = data.totals;
  return (
    <>
      <PageHeader title="Your rental business" subtitle="Track listings, completed rentals and earnings." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total listed equipment" value={t.totalListed} icon={FiBox} />
        <StatCard label="Active rentals" value={t.activeRentals} icon={FiClock} tone="accent" />
        <StatCard label="Completed rentals" value={t.completedRentals} icon={FiCheckCircle} tone="success" />
        <StatCard label="Total earnings" value={money(t.totalEarnings)} icon={FiTrendingUp} tone="info" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Monthly earnings"><MonthlyArea data={data.monthly} dataKey="earnings" label="Earnings" money /></Card>
        <Card title="Monthly rentals"><MonthlyBars data={data.monthly} dataKey="rentals" label="Rentals" /></Card>
        <Card title="Top earning equipment" className="xl:col-span-2">
          {data.topEquipment.length ? <HorizontalBars data={data.topEquipment} /> : <p className="py-10 text-center muted">No rental earnings yet.</p>}
        </Card>
      </div>
    </>
  );
}

export default function DashboardHome() {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role === "customer") router.replace("/dashboard/my-rentals");
  }, [loading, role, router]);

  if (loading || role === "customer") return <Loader label="Loading dashboard..." />;
  return role === "admin" ? <AdminOverview /> : <OwnerOverview />;
}
