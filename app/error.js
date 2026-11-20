"use client";

import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <FiAlertTriangle className="mx-auto text-warning" size={64} />
        <h1 className="mt-5 text-3xl font-extrabold">Something went wrong</h1>
        <p className="mt-3 muted">{error?.message || "An unexpected error occurred."} Please try again.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-primary">Try again</button>
          <Link href="/" className="btn btn-outline border-base-300">Go home</Link>
        </div>
      </div>
    </div>
  );
}
