import Link from "next/link";
import { FiXCircle } from "react-icons/fi";

export const metadata = { title: "Payment Cancelled" };

export default function PaymentCancelPage() {
  return (
    <div className="container-x py-20">
      <div className="card-surface mx-auto max-w-lg p-10 text-center">
        <FiXCircle className="mx-auto text-warning" size={60} />
        <h1 className="mt-5 text-3xl font-extrabold">Payment cancelled</h1>
        <p className="mt-3 muted">No charge was made and no booking was created. You can try again whenever you are ready.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/equipment" className="btn btn-primary">Back to equipment</Link>
          <Link href="/dashboard/my-rentals" className="btn btn-outline border-base-300">My rentals</Link>
        </div>
      </div>
    </div>
  );
}
