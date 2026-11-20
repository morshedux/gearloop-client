import { Suspense } from "react";
import RegisterForm from "./RegisterForm";
import Loader from "@/components/Loader";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<Loader />}>
      <RegisterForm />
    </Suspense>
  );
}
