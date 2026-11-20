import { FiCalendar, FiCreditCard, FiSearch, FiTruck } from "react-icons/fi";
import SectionHeading from "../SectionHeading";
import { Stagger, StaggerItem } from "../Motion";

export const steps = [
  { icon: FiSearch, title: "Search & compare", text: "Filter by category, location, price and availability to find the right equipment." },
  { icon: FiCalendar, title: "Pick your dates", text: "Choose a start and end date and quantity. We calculate the total instantly." },
  { icon: FiCreditCard, title: "Pay securely", text: "Check out with Stripe. Your booking is confirmed the moment payment succeeds." },
  { icon: FiTruck, title: "Receive & return", text: "Get the equipment delivered, use it and return it when your rental ends." },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="How it works" title="Rent in four simple steps" subtitle="From search to delivery, renting equipment has never been this easy." />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title} className="h-full">
              <div className="relative h-full rounded-box border border-base-300 p-7">
                <span className="absolute -top-4 left-7 flex size-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-accent-content">{i + 1}</span>
                <Icon size={30} className="mt-2 text-primary" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed muted">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
