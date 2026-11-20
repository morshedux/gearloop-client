import { Suspense } from "react";
import AllEquipment from "./AllEquipment";
import Loader from "@/components/Loader";

export const metadata = { title: "All Equipment" };

export default function EquipmentPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AllEquipment />
    </Suspense>
  );
}
