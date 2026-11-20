"use client";

import { useState } from "react";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import Pagination from "@/components/Pagination";
import StatusBadge from "@/components/StatusBadge";
import { EquipmentThumb, PageHeader, TableCard } from "@/components/dashboard/ui";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { money, shortDate } from "@/lib/format";

function MyRentals() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(() => api(`/bookings/mine?page=${page}&limit=8`), [page]);
  const items = data?.items || [];

  return (
    <>
      <PageHeader title="My rentals" subtitle="All your equipment bookings and their payment status." />
      <TableCard loading={loading} error={error} empty={!items.length}
        emptyProps={{ title: "No rentals yet", text: "Book your first piece of equipment to see it here.", action: <Link href="/equipment" className="btn btn-primary btn-sm">Browse equipment</Link> }}>
        <table className="table">
          <thead>
            <tr><th>Equipment</th><th>Start date</th><th>End date</th><th>Booking date</th><th>Total</th><th>Payment</th><th>Status</th></tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b._id} className="hover:bg-base-200/60">
                <td><EquipmentThumb src={b.equipmentImage} name={b.equipmentName} sub={`Qty ${b.quantity}`} /></td>
                <td className="whitespace-nowrap">{shortDate(b.startDate)}</td>
                <td className="whitespace-nowrap">{shortDate(b.endDate)}</td>
                <td className="whitespace-nowrap">{shortDate(b.bookingDate)}</td>
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
  return <RequireAuth roles={["customer"]}><MyRentals /></RequireAuth>;
}
