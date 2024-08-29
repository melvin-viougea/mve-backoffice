import HeaderBox from '@/components/HeaderBox'
import PartnerForm from '@/components/form/PartnerForm'
import React from 'react'
import {pageProps} from "@/types";
import {getOnePartner} from "@/lib/actions/partner.actions";
import DeletePartnerButton from "@/components/deleteButton/DeletePartnerButton";
import {cookies} from "next/headers";

const PartnerUpdate = async (props: pageProps) => {
  const partner = await getOnePartner(props.params.id);
  const cookieStore = cookies();
  const associationId = parseInt(cookieStore.get('associationId')?.value ?? '0', 10)

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={partner.name}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier un événement."
        />
        <DeletePartnerButton partner={partner} />
      </div>
      <section className="size-full pt-5">
        <PartnerForm partner={partner}  associationId={associationId} />
      </section>
    </section>
  );
};

export default PartnerUpdate;