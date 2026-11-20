import { Suspense } from "react";
import RequireAuth from "@/components/RequireAuth";
import Loader from "@/components/Loader";
import PaymentSuccess from "./PaymentSuccess";

export const metadata = { title: "Payment Successful" };

export default function PaymentSuccessPage() {
  return (
    <RequireAuth>
      <Suspense fallback={<Loader />}>
        <PaymentSuccess />
      </Suspense>
    </RequireAuth>
  );
}
