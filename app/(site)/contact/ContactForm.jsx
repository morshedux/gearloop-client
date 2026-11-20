"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    toast.success("Thanks for reaching out! We will reply within one business day.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={submit} className="card-surface space-y-4 p-7">
      <h2 className="text-xl font-bold">Send us a message</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-1.5 block text-sm font-semibold">Name</span>
          <input required className="input input-bordered w-full" value={form.name} onChange={set("name")} /></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input type="email" required className="input input-bordered w-full" value={form.email} onChange={set("email")} /></label>
      </div>
      <label className="block"><span className="mb-1.5 block text-sm font-semibold">Message</span>
        <textarea required rows={5} className="textarea textarea-bordered w-full" value={form.message} onChange={set("message")} /></label>
      <button className="btn btn-primary"><FiSend /> Send message</button>
    </form>
  );
}
