"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import EquipmentCard, { EquipmentCardSkeleton } from "../EquipmentCard";
import { Stagger, StaggerItem } from "../Motion";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";

export default function FeaturedEquipment() {
  const { data, loading, error } = useFetch(() => api("/equipment/featured", { auth: false }));

  return (
    <section className="section bg-base-200">
      <div className="container-x">
        <SectionHeading
          eyebrow="Featured"
          title="Top-rated equipment ready to rent"
          subtitle="Hand-picked, approved listings from verified owners across Bangladesh."
        />
        {error && <p className="text-center text-error">{error}</p>}
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <EquipmentCardSkeleton key={i} />)
            : (data || []).map((item) => (
                <StaggerItem key={item._id} className="h-full"><EquipmentCard item={item} /></StaggerItem>
              ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Link href="/equipment" className="btn btn-primary btn-lg">
            View All Equipment <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
