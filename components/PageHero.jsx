export default function PageHero({ eyebrow, title, text }) {
  return (
    <section className="bg-secondary text-white">
      <div className="container-x py-14">
        {eyebrow && <span className="section-eyebrow !text-accent">{eyebrow}</span>}
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{title}</h1>
        {text && <p className="mt-3 max-w-xl text-white/75">{text}</p>}
      </div>
    </section>
  );
}
