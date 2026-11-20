import PageHero from "@/components/PageHero";
import ContactForm from "./ContactForm";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const metadata = { title: "Contact Us" };

const details = [
  { icon: FiMapPin, label: "Office", value: "House 21, Road 7, Banani, Dhaka 1213" },
  { icon: FiPhone, label: "Phone", value: "+880 1700 000 000" },
  { icon: FiMail, label: "Email", value: "hello@gearloop.app" },
  { icon: FiClock, label: "Hours", value: "Sat - Thu, 9:00 AM - 6:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact us" text="Questions about a booking or listing equipment? Our team is happy to help." />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="card-surface flex items-center gap-4 p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={22} /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider muted">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
