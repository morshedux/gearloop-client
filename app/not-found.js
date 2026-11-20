import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <p className="text-8xl font-extrabold tracking-tight text-primary">404</p>
          <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
          <p className="mt-3 muted">The page you are looking for doesn&apos;t exist or has been moved.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">Back to home</Link>
            <Link href="/equipment" className="btn btn-outline border-base-300">Browse equipment</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
