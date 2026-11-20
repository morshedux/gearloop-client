"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Loader from "@/components/Loader";
import { api } from "@/lib/api";
import { money, shortDate } from "@/lib/format";

export default function PaymentSuccess() {
  const sessionId = useSearchParams().get("session_id");
  const [state, setState] = useState({ loading: true, error: "", data: null });
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!sessionId) return setState({ loading: false, error: "Missing payment session.", data: null });
    api("/payments/confirm", { method: "POST", body: { sessionId } })
      .then((data) => setState({ loading: false, error: "", data }))
      .catch((e) => setState({ loading: false, error: e.message, data: null }));
  }, [sessionId]);

  if (state.loading) return <Loader label="Confirming your payment..." />;

  if (state.error) {
    return (
      <div className="container-x py-20">
        <div className="card-surface mx-auto max-w-lg p-10 text-center">
          <FiAlertCircle className="mx-auto text-error" size={56} />
          <h1 className="mt-5 text-2xl font-extrabold">We couldn&apos;t confirm your payment</h1>
          <p className="mt-3 muted">{state.error}</p>
          <Link href="/dashboard/my-rentals" className="btn btn-primary mt-7">Check my rentals</Link>
        </div>
      </div>
    );
  }

  const b = state.data.booking;
  return (
    <div className="container-x py-20">
      <div className="card-surface mx-auto max-w-lg p-10 text-center">
        <FiCheckCircle className="mx-auto text-success" size={64} />
        <h1 className="mt-5 text-3xl font-extrabold">Payment successful!</h1>
        <p className="mt-2 muted">Your booking is confirmed. The owner has been notified.</p>

        <dl className="mt-7 space-y-3 rounded-xl bg-base-200 p-5 text-left text-sm">
          <div className="flex justify-between gap-4"><dt className="muted">Equipment</dt><dd className="text-right font-bold">{b.equipmentName}</dd></div>
          <div className="flex justify-between gap-4"><dt className="muted">Rental period</dt><dd className="font-bold">{shortDate(b.startDate)} - {shortDate(b.endDate)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="muted">Quantity</dt><dd className="font-bold">{b.quantity}</dd></div>
          <div className="flex justify-between gap-4"><dt className="muted">Amount paid</dt><dd className="font-bold text-primary">{money(b.totalAmount)}</dd></div>
          {state.data.transactionId && (
            <div className="flex justify-between gap-4"><dt className="muted">Transaction</dt><dd className="truncate font-mono text-xs font-bold">{state.data.transactionId}</dd></div>
          )}
        </dl>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard/my-rentals" className="btn btn-primary">View my rentals</Link>
          <Link href="/equipment" className="btn btn-outline border-base-300">Keep browsing</Link>
        </div>
      </div>
    </div>
  );
}
