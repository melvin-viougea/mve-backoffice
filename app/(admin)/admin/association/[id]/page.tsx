import HeaderBox from '@/components/HeaderBox'
import AssociationForm from '@/components/form/AssociationForm'
import React from 'react'
import {pageProps} from "@/types";
import {getOneAssociation} from "@/lib/actions/association.actions";
import DeleteAssociationButton from "@/components/deleteButton/DeleteAssociationButton";

const AssociationUpdate = async (props: pageProps) => {
  const association = await getOneAssociation(parseInt(props.params.id, 10));

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={association.name}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier l'association."
        />
        <DeleteAssociationButton association={association} />
      </div>
      <section className="size-full pt-5">
        <AssociationForm association={association} />
      </section>
    </section>
  );
};

export default AssociationUpdate;