"use client";

import { FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa6";
import SectionHeading from "../SectionHeading";
import Avatar from "../Avatar";
import { Stagger, StaggerItem } from "../Motion";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";

export function Stars({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <FiStar key={s} size={16} className={s <= rating ? "fill-accent text-accent" : "text-base-300"} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { data, loading } = useFetch(() => api("/reviews?limit=6", { auth: false }));
  return (
    <section className="section bg-base-200">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="What our customers say" subtitle="Real feedback from contractors, creators and event organizers who rent with GearLoop." />
        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton-line h-52" />)
            : (data || []).map((r) => (
                <StaggerItem key={r._id} className="h-full">
                  <figure className="card-surface flex h-full flex-col gap-4 p-7">
                    <FaQuoteLeft className="text-primary/30" size={26} />
                    <blockquote className="flex-1 text-[0.95rem] leading-relaxed">{r.comment}</blockquote>
                    <Stars rating={r.rating} />
                    <figcaption className="flex items-center gap-3 border-t border-base-300 pt-4">
                      <Avatar name={r.name} src={r.image} size={42} />
                      <div>
                        <p className="font-bold leading-tight">{r.name}</p>
                        <p className="text-xs muted">{r.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
        </Stagger>
      </div>
    </section>
  );
}
