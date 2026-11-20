const styles = {
  approved: "badge-success",
  paid: "badge-success",
  completed: "badge-info",
  confirmed: "badge-primary",
  pending: "badge-warning",
  rejected: "badge-error",
  cancelled: "badge-error",
  unpaid: "badge-error",
  customer: "badge-ghost",
  owner: "badge-primary",
  admin: "badge-secondary",
};

export default function StatusBadge({ value }) {
  const v = String(value || "pending").toLowerCase();
  return <span className={`badge badge-soft font-semibold capitalize ${styles[v] || "badge-ghost"}`}>{v}</span>;
}
