import HeaderBox from '@/components/HeaderBox'
import EventForm from '@/components/form/EventForm'
import React from 'react'
import {pageProps} from "@/types";
import {getOneEvent} from "@/lib/actions/event.actions";
import DeleteButton from "@/components/DeleteButton";

const EventUpdate = async (props: pageProps) => {
  const event = await getOneEvent(props.params.id);

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={event.title}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier un événement."
        />
        <DeleteButton event={event} />
      </div>
      <section className="size-full pt-5">
        <EventForm event={event} />
      </section>
    </section>
  );
};

export default EventUpdate;