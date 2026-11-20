"use client";

import { FiMapPin, FiShield } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import Avatar from "../Avatar";
import { Stagger, StaggerItem } from "../Motion";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";

export default function TrustedOwners() {
  const { data } = useFetch(() => api("/owners/top", { auth: false }));
  if (data && data.length === 0) return null;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Our community" title="Trusted equipment owners" subtitle="Owners with the most approved listings and a track record of reliable rentals." />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(data || Array.from({ length: 2 })).map((o, i) => (
            <StaggerItem key={o?._id || i} className="h-full">
              <div className="card-surface flex h-full flex-col items-center p-7 text-center">
                {o ? <Avatar name={o.name} src={o.image} size={72} /> : <span className="skeleton-line size-[72px] !rounded-full" />}
                <h3 className="mt-4 text-lg font-bold">{o?.name || "..."}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm muted"><FiMapPin /> {o?.location || "..."}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  <FiShield /> Verified owner
                </span>
                <p className="mt-3 text-sm muted">{o ? `${o.listings} active listings` : ""}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
