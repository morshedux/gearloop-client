"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import RequireAuth from "@/components/RequireAuth";
import EquipmentForm from "@/components/dashboard/EquipmentForm";
import { PageHeader } from "@/components/dashboard/ui";
import { api } from "@/lib/api";

function AddEquipment() {
  const router = useRouter();
  const submit = async (data) => {
    await api("/equipment", { method: "POST", body: data });
    await Swal.fire({ icon: "success", title: "Submitted!", text: "Your equipment is pending admin approval.", confirmButtonColor: "#0f766e" });
    router.push("/dashboard/my-equipment");
  };

  return (
    <>
      <PageHeader title="Add equipment" subtitle="List new equipment for rent. It goes live once an admin approves it." />
      <EquipmentForm onSubmit={submit} submitLabel="Submit for approval" />
    </>
  );
}

export default function Page() {
  return <RequireAuth roles={["owner"]}><AddEquipment /></RequireAuth>;
}
