"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiFilter, FiRotateCcw, FiSearch, FiX } from "react-icons/fi";
import EquipmentCard, { EquipmentCardSkeleton } from "@/components/EquipmentCard";
import Pagination from "@/components/Pagination";
import { api, toQuery } from "@/lib/api";
import { CATEGORIES, RENTAL_TYPES } from "@/lib/constants";

const PAGE_SIZE = 9;
const initial = { search: "", category: "all", rentalType: "all", minPrice: "", maxPrice: "", availability: "all", sort: "newest" };

export default function AllEquipment() {
  const params = useSearchParams();
  const [filters, setFilters] = useState({ ...initial, category: params.get("category") || "all", search: params.get("search") || "" });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(filters.search), 350);
    return () => clearTimeout(t);
  }, [filters.search]);

  const { category, rentalType, minPrice, maxPrice, availability, sort } = filters;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api(`/equipment${toQuery({ search: debouncedSearch, category, rentalType, minPrice, maxPrice, availability, sort, page, limit: PAGE_SIZE })}`, { auth: false })
      .then((data) => !cancelled && setResult(data))
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [debouncedSearch, category, rentalType, minPrice, maxPrice, availability, sort, page]);

  const update = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };
  const reset = () => { setFilters(initial); setPage(1); };
  const changePage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-bold">Category</label>
        <select className="select select-bordered w-full" value={category} onChange={(e) => update("category", e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold">Rental type</label>
        <select className="select select-bordered w-full" value={rentalType} onChange={(e) => update("rentalType", e.target.value)}>
          <option value="all">Any</option>
          {RENTAL_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold">Price range (USD)</label>
        <div className="flex items-center gap-2">
          <input type="number" min="0" placeholder="Min" className="input input-bordered w-full" value={minPrice} onChange={(e) => update("minPrice", e.target.value)} />
          <span className="muted">-</span>
          <input type="number" min="0" placeholder="Max" className="input input-bordered w-full" value={maxPrice} onChange={(e) => update("maxPrice", e.target.value)} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold">Availability</label>
        <select className="select select-bordered w-full" value={availability} onChange={(e) => update("availability", e.target.value)}>
          <option value="all">All</option>
          <option value="available">Available now</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>
      <button onClick={reset} className="btn btn-outline w-full border-base-300"><FiRotateCcw /> Reset filters</button>
    </div>
  );

  return (
    <>
      <section className="bg-secondary text-white">
        <div className="container-x py-14">
          <span className="section-eyebrow !text-accent">Marketplace</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">All Equipment</h1>
          <p className="mt-3 max-w-xl text-white/75">Search verified listings and filter by category, price, rental type and availability.</p>
        </div>
      </section>

      <div className="container-x py-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <label className="input input-bordered flex grow items-center gap-2">
            <FiSearch className="muted" />
            <input placeholder="Search by equipment name, location or category..." className="grow" value={filters.search}
              onChange={(e) => update("search", e.target.value)} />
            {filters.search && <button onClick={() => update("search", "")} aria-label="Clear search"><FiX /></button>}
          </label>
          <select className="select select-bordered sm:w-56" value={sort} onChange={(e) => update("sort", e.target.value)} aria-label="Sort">
            <option value="newest">Recently added</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button className="btn btn-outline border-base-300 lg:hidden" onClick={() => setOpen(!open)}><FiFilter /> Filters</button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className={`${open ? "block" : "hidden"} lg:block`}>
            <div className="card-surface p-5 lg:sticky lg:top-24">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold"><FiFilter /> Filters</h2>
              {filterPanel}
            </div>
          </aside>

          <div>
            <p className="mb-5 text-sm font-semibold muted">
              {loading ? "Searching..." : `${result.total} ${result.total === 1 ? "item" : "items"} found`}
            </p>
            {error && <div className="alert alert-error mb-5">{error}</div>}
            {!loading && !error && result.items.length === 0 ? (
              <div className="card-surface flex flex-col items-center px-6 py-16 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-base-200 text-primary"><FiSearch size={28} /></span>
                <h3 className="mt-5 text-xl font-bold">No equipment matches your filters</h3>
                <p className="mt-2 muted">Try a different search term or reset the filters.</p>
                <button onClick={reset} className="btn btn-primary mt-6">Reset filters</button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {loading
                  ? Array.from({ length: PAGE_SIZE }).map((_, i) => <EquipmentCardSkeleton key={i} />)
                  : result.items.map((item) => <EquipmentCard key={item._id} item={item} />)}
              </div>
            )}
            <Pagination page={page} pages={result.pages} onChange={changePage} />
          </div>
        </div>
      </div>
    </>
  );
}
