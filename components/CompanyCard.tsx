"use client";

import Link from "next/link";

export type Company = {
  _id: string;
  siret?: string;
  raison_sociale?: string;
  adresse?: string;
  code_postal?: string;
  commune?: string;
  telephone?: string;
  courriel?: string;
  site_internet?: string;
  domaines?: string[] | string | null;
  qualifications?: string[] | string | null;
};

function asArray(value: Company["domaines"]) {
  if (!value) return [];
  return Array.isArray(value) ? value : String(value).split(/\s*;\s*|\s*,\s*/g).filter(Boolean);
}

export function CompanyCard({ company }: { company: Company }) {
  const domaines = asArray(company.domaines).slice(0, 3);
  const qualifications = asArray(company.qualifications).slice(0, 3);

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {company.raison_sociale || "Entreprise RGE"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {company.adresse ? (
              <>
                {company.adresse}
                {company.code_postal ? `, ${company.code_postal}` : ""}
                {company.commune ? ` ${company.commune}` : ""}
              </>
            ) : (
              <>Localisation non renseign?e</>
            )}
          </p>
          {domaines.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {domaines.map((d) => (
                <span key={d} className="badge">{d}</span>
              ))}
            </div>
          )}
          {qualifications.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              Qualifications: {qualifications.join(", ")}
            </div>
          )}
        </div>
        <div className="text-right shrink-0">
          {company.telephone && (
            <a className="text-primary-700 font-medium block" href={`tel:${company.telephone}`}>{company.telephone}</a>
          )}
          {company.site_internet && (
            <a className="text-sm text-primary-600 hover:text-primary-800" href={company.site_internet} target="_blank" rel="noreferrer">Site web</a>
          )}
          <Link className="mt-3 inline-block text-sm text-gray-700 hover:text-gray-900" href={`/company/${company._id}`}>Voir la fiche ?</Link>
        </div>
      </div>
    </div>
  );
}
