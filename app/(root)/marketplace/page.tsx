import {SearchParamProps} from "@/types";
import HeaderBox from "@/components/HeaderBox";
import Image from "next/image";
import React from "react";

const Marketplace = async ({searchParams: {id, page}}: SearchParamProps) => {

  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row">
        <HeaderBox
          title="Marketplace"
          subtext="WIP"
        />
      </div>
      <div className="space-y-6 mx-auto">
        <Image src="/mve/wip.png" alt="WIP" width={400} height={400}/>
      </div>
    </div>
  )
}

export default Marketplace