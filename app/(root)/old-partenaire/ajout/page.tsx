import HeaderBox from '@/components/HeaderBox'
import PartnerForm from '@/components/form/PartnerForm'
import React from 'react'
import {cookies} from "next/headers";

const PartnerAdd = async () => {
  const cookieStore = cookies();
  const associationId = parseInt(cookieStore.get('associationId')?.value ?? '0', 10)

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <HeaderBox
        title="Ajouter un partenaire"
        subtext="Merci de remplir les informations ci-dessous pour ajouter un partenaire."
      />
      <section className="size-full pt-5">
        <PartnerForm associationId={associationId} />
      </section>
    </section>
  )
}

export default PartnerAdd