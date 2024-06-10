import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import EventsTable from '@/components/table/EventTable';
import {getAllEvent} from "@/lib/actions/event.actions";
import React from 'react'
import Link from "next/link";
import {SearchParamProps} from "@/types";

const Event = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const events = await getAllEvent();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(events.length / rowsPerPage);

  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;

  const currentEvents = events.slice(
    indexOfFirstEvent, indexOfLastEvent
  )
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Événement"
          subtext="Voir tous les événements."
        />
        <Link
          href={"/evenement/ajout"}
          className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
        >
          Publier un événement
        </Link>
      </div>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <EventsTable
            events={currentEvents}
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

export default Event