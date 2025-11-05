import { getCompanyById } from "@/lib/ademe";
import Link from "next/link";

export const revalidate = 300;

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const data = await getCompanyById(params.id);
  const c = data as any;

  const domaines: string[] = Array.isArray(c.domaines)
    ? c.domaines
    : (c.domaines ? String(c.domaines).split(/\s*;\s*|\s*,\s*/g) : []);
  const qualifications: string[] = Array.isArray(c.qualifications)
    ? c.qualifications
    : (c.qualifications ? String(c.qualifications).split(/\s*;\s*|\s*,\s*/g) : []);

  return (
    <div className="space-y-6">
      <Link href="/" className="text-white/80 hover:text-white">? Retour ? la recherche</Link>

      <div className="card p-6">
        <div className="flex justify-between gap-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{c.raison_sociale || "Entreprise RGE"}</h1>
            <p className="text-gray-600 mt-1">
              {c.adresse} {c.code_postal} {c.commune}
            </p>
            <div className="mt-3 space-x-4 text-sm">
              {c.telephone && (
                <a className="text-primary-700 font-medium" href={`tel:${c.telephone}`}>{c.telephone}</a>
              )}
              {c.courriel && (
                <a className="text-primary-700 font-medium" href={`mailto:${c.courriel}`}>{c.courriel}</a>
              )}
              {c.site_internet && (
                <a className="text-primary-700 font-medium" href={c.site_internet} target="_blank" rel="noreferrer">Site web</a>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-500 text-right">
            {c.siret && <div>SIRET: {c.siret}</div>}
            {c._id && <div>ID: {c._id}</div>}
          </div>
        </div>
      </div>

      {domaines.length > 0 && (
        <div className="card p-6">
          <h2 className="text-gray-900 font-medium">Domaines d'intervention</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {domaines.map((d: string) => (
              <span key={d} className="badge">{d}</span>
            ))}
          </div>
        </div>
      )}

      {qualifications.length > 0 && (
        <div className="card p-6">
          <h2 className="text-gray-900 font-medium">Qualifications RGE</h2>
          <ul className="mt-3 list-disc list-inside text-gray-700">
            {qualifications.map((q: string) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
