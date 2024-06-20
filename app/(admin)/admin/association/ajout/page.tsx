import HeaderBox from '@/components/HeaderBox'
import AssociationForm from '@/components/form/AssociationForm'
import React from 'react'

const EventAdd = async () => {

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter une assos"
        subtext="Merci de remplir les informations ci-dessous pour ajouter une assos."
      />
      <section className="size-full pt-5">
        <AssociationForm/>
      </section>
    </section>
  )
}

export default EventAdd