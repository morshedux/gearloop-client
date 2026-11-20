"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { billableUnits, calcTotal, money, todayISO, unitLabel } from "@/lib/format";

export default function BookingModal({ item, onClose }) {
  const { user } = useAuth();
  const today = todayISO();
  const [form, setForm] = useState({
    startDate: today,
    endDate: today,
    quantity: 1,
    phone: user?.phone || "",
    address: user?.address || "",
    notes: "",
  });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validRange = form.startDate && form.endDate && form.endDate >= form.startDate;
  const qty = Math.max(1, parseInt(form.quantity) || 1);

  const summary = useMemo(() => {
    if (!validRange) return null;
    return {
      units: billableUnits(item.rentalType, form.startDate, form.endDate),
      total: calcTotal(item.price, item.rentalType, form.startDate, form.endDate, qty),
    };
  }, [validRange, form.startDate, form.endDate, qty, item]);

  const submit = async (e) => {
    e.preventDefault();
    if (!validRange) return toast.error("End date must be on or after the start date");
    if (qty > item.quantity) return toast.error(`Only ${item.quantity} unit(s) in stock`);
    setBusy(true);
    try {
      const { url } = await api("/payments/checkout", {
        method: "POST",
        body: { equipmentId: item._id, ...form, quantity: qty },
      });
      toast.success("Availability confirmed. Redirecting to secure payment...");
      window.location.href = url;
    } catch (err) {
      toast.error(err.message);
      setBusy(false);
    }
  };

  return (
    <dialog className="modal modal-open" aria-labelledby="booking-title">
      <div className="modal-box max-w-2xl p-0">
        <div className="flex items-center justify-between border-b border-base-300 px-6 py-4">
          <div>
            <h2 id="booking-title" className="text-xl font-bold">Book this equipment</h2>
            <p className="text-sm muted">{item.name}</p>
          </div>
          <button className="btn btn-ghost btn-circle btn-sm" onClick={onClose} aria-label="Close"><FiX size={18} /></button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Rental start date</span>
              <input type="date" required min={today} className="input input-bordered w-full" value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value, endDate: f.endDate < e.target.value ? e.target.value : f.endDate }))} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Rental end date</span>
              <input type="date" required min={form.startDate || today} className="input input-bordered w-full" value={form.endDate} onChange={set("endDate")} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Required quantity</span>
              <input type="number" required min="1" max={item.quantity} className="input input-bordered w-full" value={form.quantity} onChange={set("quantity")} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Contact number</span>
              <input type="tel" required placeholder="01XXXXXXXXX" className="input input-bordered w-full" value={form.phone} onChange={set("phone")} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Delivery address</span>
            <input required placeholder="House, road, area, city" className="input input-bordered w-full" value={form.address} onChange={set("address")} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Additional notes <span className="font-normal muted">(optional)</span></span>
            <textarea rows={3} className="textarea textarea-bordered w-full" placeholder="Anything the owner should know?" value={form.notes} onChange={set("notes")} />
          </label>

          <div className="rounded-xl bg-base-200 p-4 text-sm">
            <div className="flex justify-between"><span className="muted">Rate</span><span className="font-semibold">{money(item.price)} / {unitLabel(item.rentalType)}</span></div>
            <div className="mt-1.5 flex justify-between"><span className="muted">Billable {unitLabel(item.rentalType)}s x quantity</span><span className="font-semibold">{summary ? `${summary.units} x ${qty}` : "-"}</span></div>
            <div className="mt-3 flex items-center justify-between border-t border-base-300 pt-3">
              <span className="font-bold">Total rental amount</span>
              <span className="text-2xl font-extrabold text-primary">{summary ? money(summary.total) : "-"}</span>
            </div>
          </div>

          <div className="modal-action mt-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? <span className="loading loading-spinner loading-sm" /> : "Confirm & Pay"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/50" onClick={onClose} />
    </dialog>
  );
}
