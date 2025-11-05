"use client";

export function Pagination({ page, size, total, onPage }: { page: number; size: number; total: number; onPage: (p: number) => void }) {
  const totalPages = Math.max(1, Math.ceil(total / size));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between text-sm text-gray-600">
      <div>
        Page {page} / {totalPages} ? {total.toLocaleString()} r?sultats
      </div>
      <div className="space-x-2">
        <button className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50" onClick={() => onPage(page - 1)} disabled={!canPrev}>
          Pr?c?dent
        </button>
        <button className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50" onClick={() => onPage(page + 1)} disabled={!canNext}>
          Suivant
        </button>
      </div>
    </div>
  );
}
