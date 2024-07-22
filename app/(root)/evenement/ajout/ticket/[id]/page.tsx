import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import EventTicketForm from "@/components/form/EventTicketForm";

const EventTicketAdd  = async ({ params }: any) => {
  const eventId = params.id;

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter un ticket à l'événement"
        subtext="Merci de remplir les informations ci-dessous pour ajouter un ticket."
      />
      <section className="size-full pt-5">
        <EventTicketForm eventId={eventId} />
      </section>
    </section>
  )
}

export default EventTicketAdd