import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import {pageProps} from "@/types";
import {getOneEventTicket} from "@/lib/actions/eventTicket.actions";
import DeleteEventTicketButton from "@/components/deleteButton/DeleteEventTicketButton";
import EventTicketForm from "@/components/form/EventTicketForm";

const EventTicketUpdate = async (props: pageProps) => {
  const eventTicket = await getOneEventTicket(props.params.id);

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={eventTicket.name}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier un ticket."
        />
        <DeleteEventTicketButton eventTicket={eventTicket} />
      </div>
      <section className="size-full pt-5">
        <EventTicketForm eventTicket={eventTicket} />
      </section>
    </section>
  );
};

export default EventTicketUpdate;