"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import RequireAuth from "@/components/RequireAuth";
import Avatar from "@/components/Avatar";
import StatusBadge from "@/components/StatusBadge";
import { PageHeader, TableCard } from "@/components/dashboard/ui";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { shortDate } from "@/lib/format";

function Users() {
  const { user: me } = useAuth();
  const { data, loading, error, setData } = useFetch(() => api("/users"));
  const [q, setQ] = useState("");
  const users = (data || []).filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(q.toLowerCase()));

  const changeRole = async (u, role) => {
    try {
      await api(`/users/${u._id}/role`, { method: "PATCH", body: { role } });
      setData((d) => d.map((x) => (x._id === u._id ? { ...x, role } : x)));
      toast.success(`${u.name} is now ${role}`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const remove = async (u) => {
    const r = await Swal.fire({
      icon: "warning", title: "Remove this user?", text: `${u.name} (${u.email}) will lose access to GearLoop.`,
      showCancelButton: true, confirmButtonText: "Yes, remove", confirmButtonColor: "#b91c1c",
    });
    if (!r.isConfirmed) return;
    try {
      await api(`/users/${u._id}`, { method: "DELETE" });
      setData((d) => d.filter((x) => x._id !== u._id));
      toast.success("User removed");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader title="All users" subtitle="Manage registered users and their roles."
        action={
          <label className="input input-bordered input-sm flex items-center gap-2 sm:w-72">
            <FiSearch className="muted" /><input className="grow" placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        } />
      <TableCard loading={loading} error={error} empty={!users.length} emptyProps={{ title: "No users found" }}>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Registered</th><th className="text-right">Manage</th></tr></thead>
          <tbody>
            {users.map((u) => {
              const self = u.email === me?.email;
              return (
                <tr key={u._id} className="hover:bg-base-200/60">
                  <td><div className="flex items-center gap-3"><Avatar name={u.name} src={u.image} size={38} /><span className="font-bold">{u.name}</span></div></td>
                  <td>{u.email}</td>
                  <td><StatusBadge value={u.role} /></td>
                  <td className="whitespace-nowrap">{shortDate(u.createdAt)}</td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <select className="select select-bordered select-sm" value={u.role} disabled={self} aria-label={`Change role for ${u.name}`}
                        onChange={(e) => changeRole(u, e.target.value)}>
                        <option value="customer">Customer</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button onClick={() => remove(u)} disabled={self} className="btn btn-sm btn-square btn-error btn-soft" aria-label="Remove user" title="Remove user"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableCard>
    </>
  );
}

export default function Page() {
  return <RequireAuth roles={["admin"]}><Users /></RequireAuth>;
}
