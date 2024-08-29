import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import PartnersTable from '@/components/table/PartnersTable';
import {getAllPartner} from "@/lib/actions/partner.actions";
import React from 'react'
import Link from "next/link";
import {SearchParamProps} from "@/types";

const Partner = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const partners = await getAllPartner();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(partners.length / rowsPerPage);

  const indexOfLastPartner = currentPage * rowsPerPage;
  const indexOfFirstPartner = indexOfLastPartner - rowsPerPage;

  const currentPartners = partners.slice(
    indexOfFirstPartner, indexOfLastPartner
  )
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Partenaire"
          subtext="Voir tous les partenaires."
        />
        <Link
          href={"/partenaire/ajout"}
          className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          Publier un partenaire
        </Link>
      </div>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <PartnersTable
            partners={currentPartners}
          />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage}/>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Partner