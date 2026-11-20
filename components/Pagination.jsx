"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const nums = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i);
    else if (nums[nums.length - 1] !== "...") nums.push("...");
  }
  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
      <button className="btn btn-sm btn-outline border-base-300" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <FiChevronLeft />
      </button>
      {nums.map((n, i) =>
        n === "..." ? (
          <span key={`d${i}`} className="px-1 muted">...</span>
        ) : (
          <button key={n} onClick={() => onChange(n)} aria-current={n === page ? "page" : undefined}
            className={`btn btn-sm ${n === page ? "btn-primary" : "btn-outline border-base-300"}`}>
            {n}
          </button>
        ),
      )}
      <button className="btn btn-sm btn-outline border-base-300" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Next page">
        <FiChevronRight />
      </button>
    </nav>
  );
}
