"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import RequireAuth from "@/components/RequireAuth";
import StatusBadge from "@/components/StatusBadge";
import { EquipmentThumb, PageHeader, TableCard } from "@/components/dashboard/ui";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { money, unitLabel } from "@/lib/format";

function MyEquipment() {
  const { data, loading, error, setData } = useFetch(() => api("/equipment/mine"));
  const items = data || [];

  const remove = async (item) => {
    const r = await Swal.fire({
      icon: "warning", title: "Delete this equipment?", text: `"${item.name}" will be permanently removed.`,
      showCancelButton: true, confirmButtonText: "Yes, delete", confirmButtonColor: "#b91c1c",
    });
    if (!r.isConfirmed) return;
    try {
      await api(`/equipment/${item._id}`, { method: "DELETE" });
      setData((d) => d.filter((i) => i._id !== item._id));
      toast.success("Equipment deleted");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader title="My equipment" subtitle="Everything you have listed for rent."
        action={<Link href="/dashboard/add-equipment" className="btn btn-primary btn-sm"><FiPlus /> Add equipment</Link>} />
      <TableCard loading={loading} error={error} empty={!items.length}
        emptyProps={{ title: "No equipment listed", text: "Add your first listing to start earning.", action: <Link href="/dashboard/add-equipment" className="btn btn-primary btn-sm">Add equipment</Link> }}>
        <table className="table">
          <thead><tr><th>Equipment</th><th>Category</th><th>Rental price</th><th>Available qty</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="hover:bg-base-200/60">
                <td><EquipmentThumb src={i.image} name={i.name} sub={i.location} /></td>
                <td>{i.category}</td>
                <td className="whitespace-nowrap font-bold">{money(i.price)} <span className="text-xs font-normal muted">/ {unitLabel(i.rentalType)}</span></td>
                <td>{i.quantity}</td>
                <td><StatusBadge value={i.status} /></td>
                <td>
                  <div className="flex justify-end gap-2">
                    <Link href={`/equipment/${i._id}`} className="btn btn-sm btn-square btn-ghost" title="View details" aria-label="View details"><FiEye /></Link>
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
  return <RequireAuth roles={["owner"]}><MyEquipment /></RequireAuth>;
}
