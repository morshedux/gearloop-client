"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUpload, FiUser } from "react-icons/fi";
import AuthShell, { AuthLink, Divider, GoogleButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";

const safeRedirect = (p) => (p && p.startsWith("/") && !p.startsWith("//") ? p : "/");

export function validatePassword(pw) {
  if (pw.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter";
  return null;
}

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = safeRedirect(params.get("redirect"));
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", photo: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (!authLoading && user) router.replace(redirect);
  }, [authLoading, user, redirect, router]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, photo: url }));
      toast.success("Photo uploaded");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const problem = validatePassword(form.password);
    setPwError(problem || "");
    if (problem) return toast.error(problem);

    setBusy(true);
    clearToken();
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photo.trim() || undefined,
    });
    setBusy(false);
    if (error) return toast.error(error.message || "Registration failed");
    await Swal.fire({ icon: "success", title: "Account created!", text: "Welcome to GearLoop.", timer: 1600, showConfirmButton: false });
    router.replace(redirect);
    router.refresh();
  };

  const google = async () => {
    setBusy(true);
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    if (error) {
      setBusy(false);
      toast.error(error.message || "Google sign-in failed");
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register as a customer. You can request an owner account from an admin later."
      footer={<>Already have an account? <AuthLink href={`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}>Login</AuthLink></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Full name</span>
          <span className="input input-bordered flex w-full items-center gap-2">
            <FiUser className="muted" />
            <input required minLength={2} placeholder="Your full name" autoComplete="name" className="grow" value={form.name} onChange={set("name")} />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <span className="input input-bordered flex w-full items-center gap-2">
            <FiMail className="muted" />
            <input type="email" required placeholder="you@example.com" autoComplete="email" className="grow" value={form.email} onChange={set("email")} />
          </span>
        </label>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">Photo <span className="font-normal muted">(link or upload)</span></span>
          <div className="flex gap-2">
            <span className="input input-bordered flex min-w-0 grow items-center gap-2">
              <FiImage className="muted shrink-0" />
              <input type="url" placeholder="https://... direct image link" className="grow" value={form.photo} onChange={set("photo")} />
            </span>
            <label className={`btn btn-outline border-base-300 ${uploading ? "btn-disabled" : ""}`} title="Upload to imgbb">
              {uploading ? <span className="loading loading-spinner loading-sm" /> : <FiUpload />}
              <input type="file" accept="image/*" className="hidden" onChange={upload} />
            </label>
          </div>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Password</span>
          <span className={`input input-bordered flex w-full items-center gap-2 ${pwError ? "input-error" : ""}`}>
            <FiLock className="muted" />
            <input type={show ? "text" : "password"} required placeholder="Min 6 chars, upper & lower case" autoComplete="new-password" className="grow"
              value={form.password} onChange={(e) => { setForm({ ...form, password: e.target.value }); setPwError(""); }} />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="muted">
              {show ? <FiEyeOff /> : <FiEye />}
            </button>
          </span>
          {pwError && <span className="mt-1.5 block text-sm font-semibold text-error">{pwError}</span>}
        </label>
        <button type="submit" disabled={busy || uploading} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Register"}
        </button>
      </form>
      <Divider />
      <GoogleButton onClick={google} loading={busy} />
    </AuthShell>
  );
}
