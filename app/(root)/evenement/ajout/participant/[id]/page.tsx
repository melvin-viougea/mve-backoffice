import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import EventPeopleForm from "@/components/form/EventPeopleForm";

const EventPeopleAdd  = async ({ params }: any) => {
  const eventId = params.id;

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter un participant à l'événement"
        subtext="Merci de remplir les informations ci-dessous pour ajouter un participant."
      />
      <section className="size-full pt-5">
        <EventPeopleForm eventId={eventId} />
      </section>
    </section>
  )
}

export default EventPeopleAdd