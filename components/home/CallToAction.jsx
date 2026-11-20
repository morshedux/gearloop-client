import Link from "next/link";
import { Reveal } from "../Motion";

export default function CallToAction() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-14 text-center text-white sm:px-14">
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-accent/25 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Have equipment sitting idle? Turn it into income.</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">Join as an owner, list your equipment in minutes and start earning from every rental.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/register" className="btn btn-accent btn-lg">Become an Owner</Link>
                <Link href="/equipment" className="btn btn-lg border-white/30 bg-white/10 text-white hover:bg-white/20">Explore Equipment</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
