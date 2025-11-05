"use client";

import { useCallback, useEffect, useState } from "react";
import { SearchBar, type SearchParams } from "@/components/SearchBar";
import { CompanyCard, type Company } from "@/components/CompanyCard";
import { Pagination } from "@/components/Pagination";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Company[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);
  const [currentParams, setCurrentParams] = useState<SearchParams>({});

  const runSearch = useCallback(async (p: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (p.query) params.set("query", p.query);
      if (p.departement) params.set("departement", p.departement);
      if (p.commune) params.set("commune", p.commune);
      params.set("size", String(p.size || size));
      params.set("page", String(p.page || 1));

      const res = await fetch(`/api/search?${params.toString()}`, { cache: "no-store" });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Erreur de recherche");
      setResults(json.results);
      setTotal(json.total);
      setPage(p.page || 1);
      setCurrentParams(p);
    } catch (e: any) {
      setError(e?.message || "Erreur inconnue");
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [size]);

  useEffect(() => {
    // initial featured search
    runSearch({ query: "RGE", page: 1, size });
  }, [runSearch, size]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Trouvez un professionnel RGE pr?s de chez vous</h1>
        <p className="text-white/70 mt-2">Donn?es officielles ADEME ? recherche par activit?, ville ou d?partement.</p>
      </div>

      <SearchBar onSearch={runSearch} />

      {error && (
        <div className="card p-4 bg-red-50 text-red-800 border-red-200">{error}</div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-white/90 font-medium">R?sultats</h2>
        <span className="text-sm text-white/60">{total.toLocaleString()} entreprises</span>
      </div>

      {loading ? (
        <div className="card p-6 text-gray-700">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {results.map((c) => (
            <CompanyCard key={c._id} company={c} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        size={size}
        total={total}
        onPage={(p) => runSearch({ ...currentParams, page: p, size })}
      />
    </div>
  );
}
