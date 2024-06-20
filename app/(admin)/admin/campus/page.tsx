import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import CampusesTable from '@/components/table/CampusesTable';
import {getAllCampus} from "@/lib/actions/campus.actions";
import React from 'react'
import Link from "next/link";
import {SearchParamProps} from "@/types";

const Campus = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const campuses = await getAllCampus();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(campuses.length / rowsPerPage);

  const indexOfLastCampus = currentPage * rowsPerPage;
  const indexOfFirstCampus = indexOfLastCampus - rowsPerPage;

  const currentCampuses = campuses.slice(
    indexOfFirstCampus, indexOfLastCampus
  )
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Campus"
          subtext="Voir tous les campus."
        />
        <Link
          href={"/admin/campus/ajout"}
          className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          Ajouter un campus
        </Link>
      </div>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <CampusesTable
            campuses={currentCampuses}
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

export default Campus