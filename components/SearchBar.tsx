"use client";

import { useEffect, useMemo, useState } from "react";

export type SearchParams = {
  query?: string;
  page?: number;
  size?: number;
  departement?: string;
  commune?: string;
};

export function SearchBar({ onSearch, initial }: { onSearch: (p: SearchParams) => void; initial?: SearchParams }) {
  const [query, setQuery] = useState(initial?.query ?? "");
  const [departement, setDepartement] = useState(initial?.departement ?? "");
  const [commune, setCommune] = useState(initial?.commune ?? "");

  const canSearch = useMemo(() => query.trim().length > 0 || departement !== "" || commune.trim().length > 0, [query, departement, commune]);

  useEffect(() => {
    // kick initial search
    if (initial && (initial.query || initial.departement || initial.commune)) {
      onSearch({ query: initial.query, departement: initial.departement, commune: initial.commune, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card p-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-3">
          <label className="text-sm text-gray-700">Recherche</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
            placeholder="Ex: isolation, chauffage, photovolta?que, entreprise..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch({ query, departement, commune, page: 1 })}
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">D?partement</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
            placeholder="Ex: 75, 44, 13"
            value={departement}
            onChange={(e) => setDepartement(e.target.value.replace(/[^0-9ABab]/g, "").slice(0, 3))}
          />
        </div>
        <div>
          <label className="text-sm text-gray-700">Commune</label>
          <input
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300"
            placeholder="Ex: Nantes, Lyon, Paris"
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button
            className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-4 py-2"
            onClick={() => onSearch({ query, departement, commune, page: 1 })}
            disabled={!canSearch}
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}
