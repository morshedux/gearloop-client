"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone, FiSave, FiUpload, FiUser } from "react-icons/fi";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
import { Card, PageHeader } from "@/components/dashboard/ui";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { shortDate } from "@/lib/format";
import { uploadToImgbb } from "@/lib/imgbb";

export default function ProfilePage() {
  const { refetch } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", image: "", phone: "", address: "" });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api("/users/me")
      .then((p) => {
        setProfile(p);
        setForm({ name: p.name || "", image: p.image || "", phone: p.phone || "", address: p.address || "" });
      })
      .catch((e) => toast.error(e.message));
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setForm((f) => ({ ...f, image: "" }));
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Photo uploaded. Save to apply.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/users/me", { method: "PATCH", body: form });
      toast.success("Profile updated successfully");
      setProfile((p) => ({ ...p, ...form }));
      refetch?.();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!profile) return <Loader label="Loading profile..." />;

  return (
    <>
      <PageHeader title="My profile" subtitle="View and update your personal information." />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="flex flex-col items-center text-center">
          <Avatar name={form.name} src={form.image} size={110} />
          <h3 className="mt-4 text-xl font-extrabold">{profile.name}</h3>
          <p className="text-sm muted break-all">{profile.email}</p>
          <div className="mt-3"><StatusBadge value={profile.role} /></div>
          <p className="mt-4 text-xs muted">Member since {shortDate(profile.createdAt)}</p>
        </Card>

        <Card title="Edit information">
          <form onSubmit={save} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Name</span>
                <span className="input input-bordered flex w-full items-center gap-2"><FiUser className="muted" />
                  <input required className="grow" value={form.name} onChange={set("name")} /></span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Email</span>
                <span className="input input-bordered flex w-full items-center gap-2 opacity-70"><FiMail className="muted" />
                  <input className="grow" value={profile.email} disabled /></span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Phone number</span>
                <span className="input input-bordered flex w-full items-center gap-2"><FiPhone className="muted" />
                  <input type="tel" className="grow" placeholder="01XXXXXXXXX" value={form.phone} onChange={set("phone")} /></span>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">Address</span>
                <span className="input input-bordered flex w-full items-center gap-2"><FiMapPin className="muted" />
                  <input className="grow" placeholder="Your address" value={form.address} onChange={set("address")} /></span>
              </label>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-semibold">Profile image</span>
              <div className="flex gap-2">
                <input type="url" className="input input-bordered w-full" placeholder="Image URL" value={form.image} onChange={set("image")} />
                <label className={`btn btn-outline border-base-300 ${uploading ? "btn-disabled" : ""}`}>
                  {uploading ? <span className="loading loading-spinner loading-sm" /> : <FiUpload />} Upload
                  <input type="file" accept="image/*" className="hidden" onChange={upload} />
                </label>
              </div>
            </div>
            <button className="btn btn-primary" disabled={busy || uploading}>
              {busy ? <span className="loading loading-spinner loading-sm" /> : <><FiSave /> Save changes</>}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
}
