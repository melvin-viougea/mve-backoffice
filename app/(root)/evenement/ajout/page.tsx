import HeaderBox from '@/components/HeaderBox'
import EventForm from '@/components/form/EventForm'
import React from 'react'
import {cookies} from "next/headers";

const EventAdd = async () => {
  const cookieStore = cookies();
  const associationId = parseInt(cookieStore.get('associationId')?.value ?? '0', 10)

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter un événement"
        subtext="Merci de remplir les informations ci-dessous pour ajouter un événement."
      />
      <section className="size-full pt-5">
        <EventForm associationId={associationId} />
      </section>
    </section>
  )
}

export default EventAdd