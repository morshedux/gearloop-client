"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiArrowLeft, FiBox, FiCalendar, FiCheckCircle, FiHeart, FiMapPin, FiPhone, FiStar, FiTool } from "react-icons/fi";
import Loader from "@/components/Loader";
import Avatar from "@/components/Avatar";
import BookingModal from "@/components/BookingModal";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { money, shortDate, unitLabel } from "@/lib/format";

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-base-200 p-4">
      <Icon className="shrink-0 text-primary" size={20} />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider muted">{label}</p>
        <p className="truncate font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function EquipmentDetails({ id }) {
  const { role } = useAuth();
  const isRenter = role === "customer";
  const { data: item, loading, error } = useFetch(() => api(`/equipment/${id}`), [id]);
  const [fav, setFav] = useState(false);
  const [favBusy, setFavBusy] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isRenter) return;
    api("/favorites/ids").then((ids) => setFav(ids.includes(id))).catch(() => {});
  }, [id, isRenter]);

  const toggleFav = async () => {
    setFavBusy(true);
    try {
      if (fav) {
        await api(`/favorites/${id}`, { method: "DELETE" });
        setFav(false);
        toast.success("Removed from favorites");
      } else {
        await api("/favorites", { method: "POST", body: { equipmentId: id } });
        setFav(true);
        toast.success("Added to favorites");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setFavBusy(false);
    }
  };

  if (loading) return <Loader label="Loading equipment..." />;
  if (error || !item) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-extrabold">Equipment not found</h1>
        <p className="mt-3 muted">{error || "This listing may have been removed or is not available."}</p>
        <Link href="/equipment" className="btn btn-primary mt-6">Browse equipment</Link>
      </div>
    );
  }

  const available = item.quantity > 0;
  const owner = item.owner || {};

  return (
    <div className="container-x py-8 sm:py-12">
      <Link href="/equipment" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <FiArrowLeft /> Back to all equipment
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-box border border-base-300 bg-base-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={item.name} className="aspect-[16/10] w-full object-cover" />
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-primary badge-soft font-semibold">{item.category}</span>
              <span className={`badge badge-soft font-semibold ${available ? "badge-success" : "badge-error"}`}>
                {available ? `${item.quantity} in stock` : "Unavailable"}
              </span>
              {item.status !== "approved" && <span className="badge badge-warning badge-soft font-semibold capitalize">{item.status}</span>}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{item.name}</h1>
            <p className="mt-2 flex items-center gap-4 text-sm muted">
              <span className="flex items-center gap-1.5"><FiMapPin /> {item.location}</span>
              {item.rating > 0 && <span className="flex items-center gap-1.5"><FiStar className="fill-accent text-accent" /> {item.rating} rating</span>}
            </p>

            <h2 className="mt-8 text-xl font-bold">Description</h2>
            <p className="mt-3 leading-relaxed muted">{item.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Info icon={FiBox} label="Brand / Model" value={`${item.brand || "-"} ${item.model || ""}`.trim()} />
              <Info icon={FiTool} label="Condition" value={item.condition} />
              <Info icon={FiCalendar} label="Rental type" value={item.rentalType} />
              <Info icon={FiCheckCircle} label="Available quantity" value={item.quantity} />
            </div>

            <h2 className="mt-8 text-xl font-bold">Rental terms and conditions</h2>
            <p className="mt-3 rounded-xl border border-base-300 bg-base-200 p-5 leading-relaxed muted">{item.terms}</p>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <p className="text-sm font-semibold muted">Rental price</p>
            <p className="mt-1 text-4xl font-extrabold">
              {money(item.price)} <span className="text-base font-semibold muted">/ {unitLabel(item.rentalType)}</span>
            </p>
            <p className="mt-1 text-sm muted">Billed {item.rentalType.toLowerCase()}. Final total is calculated from your dates and quantity.</p>

            {isRenter ? (
              <div className="mt-6 grid gap-3">
                <button className="btn btn-primary btn-lg" disabled={!available || item.status !== "approved"} onClick={() => setOpen(true)}>
                  <FiCalendar /> {available ? "Book Now" : "Currently unavailable"}
                </button>
                <button className={`btn btn-outline ${fav ? "border-error text-error" : "border-base-300"}`} onClick={toggleFav} disabled={favBusy}>
                  <FiHeart className={fav ? "fill-error" : ""} /> {fav ? "Remove from favorites" : "Add to favorites"}
                </button>
              </div>
            ) : (
              <p className="mt-6 rounded-xl bg-base-200 p-4 text-sm muted">Booking and favorites are available to customer accounts only.</p>
            )}
          </div>

          <div className="card-surface p-6">
            <h2 className="text-lg font-bold">Owner information</h2>
            <div className="mt-4 flex items-center gap-4">
              <Avatar name={owner.name} src={owner.image} size={56} />
              <div className="min-w-0">
                <p className="font-bold">{owner.name || item.ownerName}</p>
                <p className="truncate text-sm muted">{owner.email || item.ownerEmail}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm muted">
              {owner.phone && <li className="flex items-center gap-2"><FiPhone /> {owner.phone}</li>}
              <li className="flex items-center gap-2"><FiMapPin /> {owner.address || item.location}</li>
              {owner.createdAt && <li className="flex items-center gap-2"><FiCalendar /> Member since {shortDate(owner.createdAt)}</li>}
            </ul>
          </div>
        </aside>
      </div>

      {open && <BookingModal item={item} onClose={() => setOpen(false)} />}
    </div>
  );
}
