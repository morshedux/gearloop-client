"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiShield } from "react-icons/fi";

const points = ["Verified owners", "Flexible rental periods", "Secure Stripe payments"];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/equipment/hero.jpg" alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061a26]/95 via-[#0a2a3a]/85 to-[#0a2a3a]/40" />

      <div className="container-x grid min-h-[600px] items-center gap-10 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur"
          >
            <FiShield className="text-accent" /> Trusted equipment rental marketplace
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Rent the right equipment, <span className="text-accent">exactly when you need it.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-white/80"
          >
            From excavators and drones to stage lighting and tractors. Browse verified listings, pick your dates and pay securely, with no long-term commitment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/equipment" className="btn btn-accent btn-lg">
              Browse Equipment <FiArrowRight />
            </Link>
            <Link href="/register" className="btn btn-lg border-white/30 bg-white/10 text-white hover:bg-white/20">
              List Your Equipment
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85"
          >
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2"><FiCheckCircle className="text-accent" /> {p}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Why renters love us</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[["24+", "Equipment listings"], ["6", "Popular categories"], ["100%", "Secure checkout"], ["4.8/5", "Average rating"]].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-extrabold">{n}</p>
                  <p className="mt-1 text-sm text-white/75">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
