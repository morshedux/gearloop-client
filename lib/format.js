export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(Number(n) || 0);

export const shortDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-";

const DAY = 86400000;
const parse = (s) => Date.parse(`${s}T00:00:00Z`);

export const daysBetween = (start, end) => Math.round((parse(end) - parse(start)) / DAY) + 1;

export function billableUnits(rentalType, start, end) {
  const days = daysBetween(start, end);
  if (rentalType === "Weekly") return Math.ceil(days / 7);
  if (rentalType === "Monthly") return Math.ceil(days / 30);
  return days;
}

export const calcTotal = (price, rentalType, start, end, qty) =>
  Math.round(price * billableUnits(rentalType, start, end) * qty * 100) / 100;

export const unitLabel = (rentalType) => ({ Daily: "day", Weekly: "week", Monthly: "month" })[rentalType] || "day";

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const initials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "U";
