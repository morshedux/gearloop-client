"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FiEye, FiHeart, FiTrash2 } from "react-icons/fi";
import RequireAuth from "@/components/RequireAuth";
import { EquipmentThumb, PageHeader, TableCard } from "@/components/dashboard/ui";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { money, unitLabel } from "@/lib/format";

function Favorites() {
  const { data, loading, error, setData } = useFetch(() => api("/favorites"));
  const items = data || [];

  const remove = async (id) => {
    try {
      await api(`/favorites/${id}`, { method: "DELETE" });
      setData((d) => d.filter((i) => i._id !== id));
      toast.success("Removed from favorites");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader title="Favorites" subtitle="Equipment you saved for later." />
      <TableCard loading={loading} error={error} empty={!items.length}
        emptyProps={{ title: "No favorites yet", text: "Tap the heart on any equipment page to save it here.", action: <Link href="/equipment" className="btn btn-primary btn-sm"><FiHeart /> Find equipment</Link> }}>
        <table className="table">
          <thead><tr><th>Equipment</th><th>Category</th><th>Price</th><th>Location</th><th className="text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((i) => (
              <tr key={i._id} className="hover:bg-base-200/60">
                <td><EquipmentThumb src={i.image} name={i.name} sub={i.quantity > 0 ? `${i.quantity} available` : "Unavailable"} /></td>
                <td>{i.category}</td>
                <td className="whitespace-nowrap font-bold">{money(i.price)} <span className="text-xs font-normal muted">/ {unitLabel(i.rentalType)}</span></td>
                <td>{i.location}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <Link href={`/equipment/${i._id}`} className="btn btn-sm btn-primary btn-soft"><FiEye /> View Details</Link>
                    <button onClick={() => remove(i._id)} className="btn btn-sm btn-error btn-soft"><FiTrash2 /> Remove</button>
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
  return <RequireAuth roles={["customer"]}><Favorites /></RequireAuth>;
}
