"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import RequireAuth from "@/components/RequireAuth";
import Pagination from "@/components/Pagination";
import StatusBadge from "@/components/StatusBadge";
import { PageHeader, TableCard } from "@/components/dashboard/ui";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { daysBetween, money, shortDate } from "@/lib/format";

function AllRentals() {
  const [page, setPage] = useState(1);
  const { data, loading, error, setData } = useFetch(() => api(`/bookings?page=${page}&limit=10`), [page]);
  const items = data?.items || [];

  const changeStatus = async (b, status) => {
    try {
      await api(`/bookings/${b._id}/status`, { method: "PATCH", body: { status } });
      setData((d) => ({ ...d, items: d.items.map((x) => (x._id === b._id ? { ...x, bookingStatus: status } : x)) }));
      toast.success(`Booking marked ${status}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader title="All rentals" subtitle="Monitor every booking across the platform." />
      <TableCard loading={loading} error={error} empty={!items.length} emptyProps={{ title: "No rentals yet" }}>
        <table className="table">
          <thead><tr><th>Customer</th><th>Owner</th><th>Equipment</th><th>Rental duration</th><th>Amount</th><th>Payment</th><th>Status</th><th>Manage</th></tr></thead>
          <tbody>
            {items.map((b) => (
              <tr key={b._id} className="hover:bg-base-200/60">
                <td><p className="font-bold">{b.renterName}</p><p className="text-xs muted">{b.renterEmail}</p></td>
                <td><p className="font-bold">{b.ownerName}</p><p className="text-xs muted">{b.ownerEmail}</p></td>
                <td className="max-w-[200px] font-semibold">{b.equipmentName}<span className="block text-xs font-normal muted">Qty {b.quantity}</span></td>
                <td className="whitespace-nowrap">
                  <p className="font-semibold">{shortDate(b.startDate)} - {shortDate(b.endDate)}</p>
                  <p className="text-xs muted">{daysBetween(b.startDate, b.endDate)} day(s)</p>
                </td>
                <td className="font-bold">{money(b.totalAmount)}</td>
                <td><StatusBadge value={b.paymentStatus} /></td>
                <td><StatusBadge value={b.bookingStatus} /></td>
                <td>
                  <select className="select select-bordered select-sm" value={b.bookingStatus} aria-label={`Change status for ${b.equipmentName}`}
                    onChange={(e) => changeStatus(b, e.target.value)}>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
      <Pagination page={page} pages={data?.pages || 1} onChange={setPage} />
    </>
  );
}

export default function Page() {
  return <RequireAuth roles={["admin"]}><AllRentals /></RequireAuth>;
}
