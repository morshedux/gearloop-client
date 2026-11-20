"use client";

import { useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import Pagination from "@/components/Pagination";
import StatusBadge from "@/components/StatusBadge";
import { EquipmentThumb, PageHeader, TableCard } from "@/components/dashboard/ui";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { daysBetween, money, shortDate } from "@/lib/format";

function EquipmentRentals() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(() => api(`/bookings/owner?page=${page}&limit=8`), [page]);
  const items = data?.items || [];

  return (
    <>
      <PageHeader title="My equipment rentals" subtitle="Bookings made on your equipment." />
      <TableCard loading={loading} error={error} empty={!items.length}
        emptyProps={{ title: "No rentals yet", text: "When customers book your equipment, they will appear here." }}>
        <table className="table">
          <thead><tr><th>Customer</th><th>Equipment</th><th>Rental duration</th><th>Qty</th><th>Amount</th><th>Payment</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((b) => (
              <tr key={b._id} className="hover:bg-base-200/60">
                <td>
                  <p className="font-bold">{b.renterName}</p>
                  <p className="text-xs muted">{b.renterEmail}</p>
                  <p className="text-xs muted">{b.phone}</p>
                </td>
                <td><EquipmentThumb src={b.equipmentImage} name={b.equipmentName} sub={b.category} /></td>
                <td className="whitespace-nowrap">
                  <p className="font-semibold">{shortDate(b.startDate)} - {shortDate(b.endDate)}</p>
                  <p className="text-xs muted">{daysBetween(b.startDate, b.endDate)} day(s)</p>
                </td>
                <td>{b.quantity}</td>
                <td className="font-bold">{money(b.totalAmount)}</td>
                <td><StatusBadge value={b.paymentStatus} /></td>
                <td><StatusBadge value={b.bookingStatus} /></td>
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
  return <RequireAuth roles={["owner"]}><EquipmentRentals /></RequireAuth>;
}
