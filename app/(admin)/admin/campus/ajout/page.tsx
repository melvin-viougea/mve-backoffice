import HeaderBox from '@/components/HeaderBox'
import CampusForm from '@/components/form/CampusForm'
import React from 'react'

const CampusAdd = async () => {

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter un campus"
        subtext="Merci de remplir les informations ci-dessous pour ajouter un campus."
      />
      <section className="size-full pt-5">
        <CampusForm />
      </section>
    </section>
  )
}

export default CampusAdd