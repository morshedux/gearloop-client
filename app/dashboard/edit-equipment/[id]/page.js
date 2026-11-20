"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RequireAuth from "@/components/RequireAuth";
import Loader from "@/components/Loader";
import EquipmentForm from "@/components/dashboard/EquipmentForm";
import { PageHeader } from "@/components/dashboard/ui";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";

function EditEquipment() {
  const { id } = useParams();
  const router = useRouter();
  const { role } = useAuth();
  const { data, loading, error } = useFetch(() => api(`/equipment/${id}`), [id]);

  const submit = async (form) => {
    await api(`/equipment/${id}`, { method: "PUT", body: form });
    toast.success("Equipment updated successfully");
    router.push(role === "admin" ? "/dashboard/all-equipment" : "/dashboard/my-equipment");
  };

  if (loading) return <Loader label="Loading equipment..." />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <>
      <PageHeader title="Update equipment" subtitle={data.name} />
      <EquipmentForm initial={data} onSubmit={submit} submitLabel="Update equipment" showStatus />
    </>
  );
}

export default function Page() {
  return <RequireAuth roles={["owner", "admin"]}><EditEquipment /></RequireAuth>;
}
