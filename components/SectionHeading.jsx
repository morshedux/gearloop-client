import { Reveal } from "./Motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", action }) {
  const center = align === "center";
  return (
    <Reveal className={`mb-10 flex flex-col gap-3 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={`flex flex-col gap-3 ${center ? "items-center" : ""}`}>
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      {action}
    </Reveal>
  );
}
