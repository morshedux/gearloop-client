import RequireAuth from "@/components/RequireAuth";
import EquipmentDetails from "./EquipmentDetails";

export const metadata = { title: "Equipment Details" };

export default async function EquipmentDetailsPage({ params }) {
  const { id } = await params;
  return (
    <RequireAuth>
      <EquipmentDetails id={id} />
    </RequireAuth>
  );
}
