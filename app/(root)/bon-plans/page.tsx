import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import DealsTable from "@/components/table/DealsTable";
import {getAllDeal} from "@/lib/actions/deal.actions";
import React from 'react'
import Link from "next/link";
import {SearchParamProps} from "@/types";

const Deal = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const deals = await getAllDeal();
  const rowsPerPage = 10;
  const totalPages = Math.ceil(deals.length / rowsPerPage);

  const indexOfLastDeal = currentPage * rowsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - rowsPerPage;

  const currentDeals = deals.slice(
    indexOfFirstDeal, indexOfLastDeal
  )
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Bon plans"
          subtext=""
        />
        <Link
          href={"/bon-plans/ajout"}
          className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          Ajouter un bon plans
        </Link>
      </div>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <DealsTable
            deals={currentDeals}
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

export default Deal