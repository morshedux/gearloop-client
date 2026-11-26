"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import AuthShell, { AuthLink, Divider, GoogleButton } from "@/components/auth/AuthShell";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";

const safeRedirect = (p) => (p && p.startsWith("/") && !p.startsWith("//") ? p : "/");

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = safeRedirect(params.get("redirect"));
  const { user, loading: authLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && user) router.replace(redirect);
  }, [authLoading, user, redirect, router]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    clearToken();
    const attempt = () => authClient.signIn.email({ email: form.email.trim(), password: form.password });
    let { error } = await attempt();
    // A 5xx means the server (not the credentials) failed, e.g. a cold start. Retry once.
    if (error && (!error.status || error.status >= 500)) {
      await new Promise((r) => setTimeout(r, 1200));
      ({ error } = await attempt());
    }
    setBusy(false);
    if (error) {
      const serverProblem = !error.status || error.status >= 500;
      return toast.error(serverProblem ? "Server is waking up. Please try again in a few seconds." : error.message || "Invalid email or password");
    }
    await Swal.fire({ icon: "success", title: "Welcome back!", text: "You have logged in successfully.", timer: 1500, showConfirmButton: false });
    router.replace(redirect);
    router.refresh();
  };

  const google = async () => {
    setBusy(true);
    let { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    if (error && (!error.status || error.status >= 500)) {
      await new Promise((r) => setTimeout(r, 1200));
      ({ error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect }));
    }
    if (error) {
      setBusy(false);
      toast.error(error.status >= 500 || !error.status ? "Server is waking up. Please try again in a few seconds." : error.message || "Google sign-in failed");
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your rentals and listings."
      footer={<>New to GearLoop? <AuthLink href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}>Create an account</AuthLink></>}
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="form-control block">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <span className="input input-bordered flex w-full items-center gap-2">
            <FiMail className="muted" />
            <input type="email" required placeholder="you@example.com" autoComplete="email" className="grow"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </span>
        </label>
        <label className="form-control block">
          <span className="mb-1.5 block text-sm font-semibold">Password</span>
          <span className="input input-bordered flex w-full items-center gap-2">
            <FiLock className="muted" />
            <input type={show ? "text" : "password"} required placeholder="Your password" autoComplete="current-password" className="grow"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="muted">
              {show ? <FiEyeOff /> : <FiEye />}
            </button>
          </span>
        </label>
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Login"}
        </button>
      </form>
      <Divider />
      <GoogleButton onClick={google} loading={busy} />
    </AuthShell>
  );
}
