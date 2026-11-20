"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { Card } from "./ui";
import { useAuth } from "@/hooks/useAuth";
import { CATEGORIES, CONDITIONS, RENTAL_TYPES } from "@/lib/constants";
import { uploadToImgbb } from "@/lib/imgbb";

const empty = {
  name: "", description: "", category: CATEGORIES[0], location: "", price: "", rentalType: "Daily",
  quantity: 1, condition: "Good", brand: "", model: "", image: "", terms: "",
};

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

export default function EquipmentForm({ initial, onSubmit, submitLabel = "Save equipment", showStatus = false }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ ...empty, ...(initial || {}) });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.image) return toast.error("Please upload an equipment image");
    setBusy(true);
    try {
      await onSubmit({ ...form, price: Number(form.price), quantity: parseInt(form.quantity) });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <Card title="Equipment details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Equipment name" className="sm:col-span-2">
            <input required minLength={3} className="input input-bordered w-full" placeholder="e.g. Canon EOS R5 Camera Kit" value={form.name} onChange={set("name")} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <textarea required minLength={10} rows={4} className="textarea textarea-bordered w-full" placeholder="Describe the equipment, what is included and ideal uses" value={form.description} onChange={set("description")} />
          </Field>
          <Field label="Category">
            <select className="select select-bordered w-full" value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Location">
            <input required className="input input-bordered w-full" placeholder="City or area" value={form.location} onChange={set("location")} />
          </Field>
          <Field label="Rental price (USD)">
            <input required type="number" min="1" step="0.01" className="input input-bordered w-full" value={form.price} onChange={set("price")} />
          </Field>
          <Field label="Rental type">
            <select className="select select-bordered w-full" value={form.rentalType} onChange={set("rentalType")}>
              {RENTAL_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Available quantity">
            <input required type="number" min="0" className="input input-bordered w-full" value={form.quantity} onChange={set("quantity")} />
          </Field>
          <Field label="Equipment condition">
            <select className="select select-bordered w-full" value={form.condition} onChange={set("condition")}>
              {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Brand">
            <input className="input input-bordered w-full" value={form.brand} onChange={set("brand")} />
          </Field>
          <Field label="Model">
            <input className="input input-bordered w-full" value={form.model} onChange={set("model")} />
          </Field>
          <Field label="Rental terms and conditions" className="sm:col-span-2">
            <textarea rows={3} className="textarea textarea-bordered w-full" placeholder="Deposit, return policy, late fees..." value={form.terms} onChange={set("terms")} />
          </Field>
        </div>
      </Card>

      <div className="space-y-6">
        <Card title="Equipment image">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-base-300 bg-base-200">
            {form.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="Preview" className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center text-sm muted">No image selected</div>
            )}
          </div>
          <label className={`btn btn-outline mt-4 w-full border-base-300 ${uploading ? "btn-disabled" : ""}`}>
            {uploading ? <span className="loading loading-spinner loading-sm" /> : <FiUpload />} Upload image (imgbb)
            <input type="file" accept="image/*" className="hidden" onChange={upload} />
          </label>
        </Card>

        <Card title="Listing info">
          <dl className="space-y-3 text-sm">
            {showStatus && initial?.status && (
              <div className="flex justify-between"><dt className="muted">Status</dt><dd className="font-bold capitalize">{initial.status}</dd></div>
            )}
            {!showStatus && <div className="flex justify-between"><dt className="muted">Status</dt><dd className="font-bold">Pending approval</dd></div>}
            <div className="flex justify-between"><dt className="muted">Owner</dt><dd className="font-bold">{initial?.ownerName || user?.name}</dd></div>
            <div className="flex justify-between gap-3"><dt className="muted">Owner email</dt><dd className="truncate font-bold">{initial?.ownerEmail || user?.email}</dd></div>
          </dl>
          <button className="btn btn-primary mt-5 w-full" disabled={busy || uploading}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
          </button>
        </Card>
      </div>
    </form>
  );
}
