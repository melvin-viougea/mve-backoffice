import HeaderBox from '@/components/HeaderBox'
import DealForm from '@/components/form/DealForm'
import React from 'react'
import {pageProps} from "@/types";
import {getOneDeal} from "@/lib/actions/deal.actions";
import DeleteDealButton from "@/components/deleteButton/DeleteDealButton";
import {cookies} from "next/headers";

const DealUpdate = async (props: pageProps) => {
  const deal = await getOneDeal(props.params.id);
  const cookieStore = cookies();
  const associationId = parseInt(cookieStore.get('associationId')?.value ?? '0', 10)

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={deal.name}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier un événement."
        />
        <DeleteDealButton deal={deal} />
      </div>
      <section className="size-full pt-5">
        <DealForm deal={deal}  associationId={associationId} />
      </section>
    </section>
  );
};

export default DealUpdate;