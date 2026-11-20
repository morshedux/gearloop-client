import Link from "next/link";
import { FiAward, FiTarget, FiUsers } from "react-icons/fi";
import PageHero from "@/components/PageHero";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export const metadata = { title: "About Us" };

const values = [
  { icon: FiTarget, title: "Our mission", text: "Make professional equipment accessible to everyone by connecting owners with idle gear to people who need it for a short time." },
  { icon: FiUsers, title: "Community first", text: "Every owner is reviewed and every listing is approved by our team so renters can book with confidence." },
  { icon: FiAward, title: "Quality & trust", text: "Transparent pricing, clear rental terms and secure Stripe payments protect both sides of every booking." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About GearLoop" title="Built to keep great equipment in use" text="GearLoop turns idle equipment into income for owners and gives customers affordable access to the right tools." />
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/equipment/harvester.jpg" alt="Combine harvester working in a wheat field" className="aspect-[4/3] w-full rounded-box object-cover" />
          <div>
            <span className="section-eyebrow">Our story</span>
            <h2 className="section-title mt-3">Why we started GearLoop</h2>
            <p className="mt-4 leading-relaxed muted">Buying expensive machinery for a single project rarely makes sense, while owners often have valuable equipment sitting unused between jobs. GearLoop closes that gap with a simple, secure rental marketplace.</p>
            <p className="mt-4 leading-relaxed muted">Owners list equipment, admins verify it, and customers book for exactly the dates they need. Payments are handled by Stripe, and every rental is tracked from booking to completion.</p>
            <Link href="/equipment" className="btn btn-primary mt-7">Explore equipment</Link>
          </div>
        </div>
      </section>
      <section className="section bg-base-200 !py-14">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-surface p-7">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={24} /></span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <WhyChooseUs />
    </>
  );
}
