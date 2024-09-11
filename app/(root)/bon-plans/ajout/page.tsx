import HeaderBox from '@/components/HeaderBox'
import DealForm from '@/components/form/DealForm'
import React from 'react'
import {cookies} from "next/headers";

const DealAdd = async () => {
  const cookieStore = cookies();
  const associationId = parseInt(cookieStore.get('associationId')?.value ?? '0', 10)

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter un bon plan"
        subtext="Merci de remplir les informations ci-dessous pour ajouter un bon plan."
      />
      <section className="size-full pt-5">
        <DealForm associationId={associationId} />
      </section>
    </section>
  )
}

export default DealAdd