import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Loader from "@/components/Loader";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <LoginForm />
    </Suspense>
  );
}
