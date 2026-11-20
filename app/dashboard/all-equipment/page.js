"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiCheck, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import RequireAuth from "@/components/RequireAuth";
import StatusBadge from "@/components/StatusBadge";
import { EquipmentThumb, PageHeader, TableCard } from "@/components/dashboard/ui";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { money } from "@/lib/format";

const TABS = ["all", "pending", "approved", "rejected"];

function AllEquipment() {
  const { data, loading, error, setData } = useFetch(() => api("/equipment/admin/all"));
  const [tab, setTab] = useState("all");
  const items = (data || []).filter((i) => tab === "all" || i.status === tab);

  const setStatus = async (item, status) => {
    try {
      await api(`/equipment/${item._id}/status`, { method: "PATCH", body: { status } });
      setData((d) => d.map((x) => (x._id === item._id ? { ...x, status } : x)));
      toast.success(`Equipment ${status}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const remove = async (item) => {
    const r = await Swal.fire({
      icon: "warning", title: "Delete this equipment?", text: `"${item.name}" will be permanently removed.`,
      showCancelButton: true, confirmButtonText: "Yes, delete", confirmButtonColor: "#b91c1c",
    });
    if (!r.isConfirmed) return;
    try {
      await api(`/equipment/${item._id}`, { method: "DELETE" });
      setData((d) => d.filter((x) => x._id !== item._id));
      toast.success("Equipment deleted");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader title="All equipment" subtitle="Review, approve and manage every listing on the platform." />
      <div role="tablist" className="tabs tabs-box mb-5 w-fit max-w-full overflow-x-auto bg-base-100">
        {TABS.map((t) => (
          <button key={t} role="tab" onClick={() => setTab(t)} className={`tab capitalize font-semibold ${tab === t ? "tab-active" : ""}`}>
            {t} {data && <span className="ml-1.5 text-xs opacity-70">({t === "all" ? data.length : data.filter((i) => i.status === t).length})</span>}
          </button>
        ))}
      </div>
      <TableCard loading={loading} error={error} empty={!items.length} emptyProps={{ title: "No equipment in this view" }}>
        <table className="table">
          <thead><tr><th>Equipment</th><th>Owner</th><th>Category</th><th>Price</th><th>Qty</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="hover:bg-base-200/60">
                <td><EquipmentThumb src={i.image} name={i.name} sub={i.location} /></td>
                <td><p className="font-semibold">{i.ownerName}</p><p className="text-xs muted">{i.ownerEmail}</p></td>
                <td>{i.category}</td>
                <td className="whitespace-nowrap font-bold">{money(i.price)}</td>
                <td>{i.quantity}</td>
                <td><StatusBadge value={i.status} /></td>
                <td>
                  <div className="flex justify-end gap-1.5">
                    <button disabled={i.status === "approved"} onClick={() => setStatus(i, "approved")} className="btn btn-sm btn-success btn-soft" title="Approve"><FiCheck /> Approve</button>
                    <button disabled={i.status === "rejected"} onClick={() => setStatus(i, "rejected")} className="btn btn-sm btn-warning btn-soft" title="Reject"><FiX /> Reject</button>
                    <Link href={`/dashboard/edit-equipment/${i._id}`} className="btn btn-sm btn-square btn-primary btn-soft" title="Update" aria-label="Update"><FiEdit2 /></Link>
                    <button onClick={() => remove(i)} className="btn btn-sm btn-square btn-error btn-soft" title="Delete" aria-label="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </>
  );
}

export default function Page() {
  return <RequireAuth roles={["admin"]}><AllEquipment /></RequireAuth>;
}
