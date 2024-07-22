import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import {pageProps} from "@/types";
import {getOneEventPeople} from "@/lib/actions/eventPeople.actions";
import DeleteEventPeopleButton from "@/components/deleteButton/DeleteEventPeopleButton";
import EventPeopleForm from "@/components/form/EventPeopleForm";

const EventPeopleUpdate = async (props: pageProps) => {
  const eventPeople = await getOneEventPeople(props.params.id);

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={eventPeople.name}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier un participant."
        />
        <DeleteEventPeopleButton eventPeople={eventPeople} />
      </div>
      <section className="size-full pt-5">
        <EventPeopleForm eventPeople={eventPeople} />
      </section>
    </section>
  );
};

export default EventPeopleUpdate;