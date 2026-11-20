import Link from "next/link";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata = { title: "How It Works" };

const faqs = [
  ["Do I need an account to browse?", "No. Anyone can browse the equipment list. You need an account to view full details and book."],
  ["How is the rental price calculated?", "The price is the owner's rate multiplied by the number of billable days, weeks or months and the quantity you select."],
  ["Is my payment secure?", "Yes. Payments are processed by Stripe Checkout. We never see or store your card details."],
  ["How do I list my own equipment?", "Ask an admin to upgrade your account to an owner. Then add your equipment, and it goes live after admin approval."],
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="Guide" title="How GearLoop works" text="A simple process for renters and owners, from first search to final return." />
      <HowItWorks />
      <section className="section bg-base-200">
        <div className="container-x max-w-3xl">
          <h2 className="section-title mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map(([q, a]) => (
              <div key={q} className="collapse collapse-arrow border border-base-300 bg-base-100">
                <input type="radio" name="faq" aria-label={q} />
                <div className="collapse-title font-bold">{q}</div>
                <div className="collapse-content text-sm leading-relaxed muted"><p>{a}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center"><Link href="/equipment" className="btn btn-primary">Start browsing</Link></div>
        </div>
      </section>
    </>
  );
}
