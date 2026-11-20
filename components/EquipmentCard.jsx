"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMapPin, FiStar } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { money, unitLabel } from "@/lib/format";

export function EquipmentCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="skeleton-line aspect-[4/3] w-full !rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton-line h-4 w-1/3" />
        <div className="skeleton-line h-6 w-4/5" />
        <div className="skeleton-line h-4 w-1/2" />
        <div className="skeleton-line h-10 w-full" />
      </div>
    </div>
  );
}

// Equal-height card used on the home page and the All Equipment page.
export default function EquipmentCard({ item }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const available = item.quantity > 0;
  const href = `/equipment/${item._id}`;

  const view = () => {
    // Not logged in -> login first, then come back to this equipment.
    if (!loading && !user) router.push(`/login?redirect=${encodeURIComponent(href)}`);
    else router.push(href);
  };

  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-105" />
        <span className={`badge absolute left-3 top-3 border-0 font-semibold ${available ? "bg-success text-success-content" : "bg-error text-error-content"}`}>
          {available ? `${item.quantity} available` : "Unavailable"}
        </span>
        {item.rating > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-base-100/95 px-2.5 py-1 text-xs font-bold text-base-content">
            <FiStar className="fill-accent text-accent" /> {item.rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">{item.category}</span>
        <h3 className="line-clamp-1 text-lg font-bold leading-snug">{item.name}</h3>
        <p className="flex items-center gap-1.5 text-sm muted"><FiMapPin className="shrink-0" /> {item.location}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-base-300 pt-4">
          <div>
            <p className="text-2xl font-extrabold leading-none">{money(item.price)}</p>
            <p className="mt-1 text-xs font-semibold muted">per {unitLabel(item.rentalType)} · {item.rentalType}</p>
          </div>
          <button onClick={view} className="btn btn-primary btn-sm">View Details</button>
        </div>
      </div>
    </article>
  );
}
