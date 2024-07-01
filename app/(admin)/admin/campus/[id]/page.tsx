import HeaderBox from '@/components/HeaderBox'
import CampusForm from '@/components/form/CampusForm'
import React from 'react'
import {pageProps} from "@/types";
import {getOneCampus} from "@/lib/actions/campus.actions";
import DeleteCampusButton from "@/components/deleteButton/DeleteCampusButton";

const CampusUpdate = async (props: pageProps) => {
  const campus = await getOneCampus(props.params.id);

  return (
    <section className="no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12">
      <div className="flex items-center justify-between">
        <HeaderBox
          title={campus.name}
          subtext="Merci d'ajuster les informations ci-dessous pour modifier le campus."
        />
        <DeleteCampusButton campus={campus} />
      </div>
      <section className="size-full pt-5">
        <CampusForm campus={campus} />
      </section>
    </section>
  );
};

export default CampusUpdate;