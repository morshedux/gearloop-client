"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { Stagger, StaggerItem } from "../Motion";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import { CATEGORIES, CATEGORY_IMAGES } from "@/lib/constants";

export default function Categories() {
  const { data } = useFetch(() => api("/equipment/categories", { auth: false }));
  const counts = Object.fromEntries((data || []).map((c) => [c.name, c.count]));

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Categories"
          title="Popular equipment categories"
          subtitle="Whatever the project, find the gear for it in one of our most-rented categories."
        />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((name) => (
            <StaggerItem key={name}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link href={`/equipment?category=${encodeURIComponent(name)}`} className="group relative block h-60 overflow-hidden rounded-box">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CATEGORY_IMAGES[name]} alt={name} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04141c]/90 via-[#04141c]/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="mt-1 text-sm text-white/80">{counts[name] ?? 0} listings</p>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
