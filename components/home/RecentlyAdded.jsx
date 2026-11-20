"use client";

import SectionHeading from "../SectionHeading";
import EquipmentCard, { EquipmentCardSkeleton } from "../EquipmentCard";
import { Stagger, StaggerItem } from "../Motion";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";

export default function RecentlyAdded() {
  const { data, loading } = useFetch(() => api("/equipment/recent", { auth: false }));
  return (
    <section className="section bg-base-200">
      <div className="container-x">
        <SectionHeading eyebrow="Just listed" title="Recently added equipment" subtitle="Fresh listings from our community of owners, updated every day." />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <EquipmentCardSkeleton key={i} />)
            : (data || []).map((item) => (
                <StaggerItem key={item._id} className="h-full"><EquipmentCard item={item} /></StaggerItem>
              ))}
        </Stagger>
      </div>
    </section>
  );
}
