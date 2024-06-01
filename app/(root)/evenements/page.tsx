import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import EventsTable from '@/components/EventTable';
import {getAllEvent} from "@/lib/actions/event.actions";
import React from 'react'

const Event = async ({ searchParams: { id, page }}:SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const events = await getAllEvent();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(events?.length ?? 0 / rowsPerPage);

  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;

  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent) || [];
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Evenement"
          subtext="Voir tous les evenements."
        />
      </div>
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <EventsTable
            events={currentEvents}
          />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Event