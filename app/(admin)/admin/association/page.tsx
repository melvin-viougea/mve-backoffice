import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import AssociationsTable from "@/components/table/AssociationsTable";
import {getAllAssociation} from "@/lib/actions/association.actions";
import React from 'react'
import Link from "next/link";
import {SearchParamProps} from "@/types";

const Association = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const associations = await getAllAssociation();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(associations.length / rowsPerPage);

  const indexOfLastAssociation = currentPage * rowsPerPage;
  const indexOfFirstAssociation = indexOfLastAssociation - rowsPerPage;

  const currentAssociations = associations.slice(
    indexOfFirstAssociation, indexOfLastAssociation
  )
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Assos"
          subtext="Voir tous les associations."
        />
        <Link
          href={"/admin/association/ajout"}
          className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          Ajouter une association
        </Link>
      </div>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <AssociationsTable
            associations={currentAssociations}
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

export default Association