import { FiClock, FiDollarSign, FiLock, FiUserCheck } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import { Stagger, StaggerItem } from "../Motion";

const benefits = [
  { icon: FiDollarSign, title: "Affordable rental prices", text: "Pay only for the days you need. Transparent pricing with no hidden fees at checkout." },
  { icon: FiUserCheck, title: "Verified equipment owners", text: "Every listing is reviewed and approved by our team before it goes live." },
  { icon: FiClock, title: "Flexible rental periods", text: "Rent daily, weekly or monthly depending on the equipment and your schedule." },
  { icon: FiLock, title: "Secure online payments", text: "Payments are processed by Stripe so your card details never touch our servers." },
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-base-200">
      <div className="container-x">
        <SectionHeading eyebrow="Why GearLoop" title="Why choose us" subtitle="A rental experience built around trust, clarity and convenience for both owners and renters." />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className="h-full">
              <div className="card-surface h-full p-7 transition hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon size={26} /></span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
