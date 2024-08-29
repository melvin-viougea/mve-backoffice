'use client'

import React, {useEffect} from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {deletePartner} from "@/lib/actions/partner.actions";
import {useRouter} from "next/navigation";

const DeletePartnerButton = ({partner}: any) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const deletedPartner = await deletePartner(id);
    if (deletedPartner) {
      router.push('/partenaire');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button onClick={() => handleDelete(partner.id)} className="text-[14px] leading-[20px] w-full bg-destructive font-semibold text-destructive-foreground hover:bg-destructive/80 shadow-form !important">
        <div className="flex items-center gap-2">
          <Image src="/icons/delete.svg" alt="delete" width={20} height={20} className="cursor-pointer invert"/>
          <span>Supprimer</span>
        </div>
      </Button>
    </div>
  );
};

export default DeletePartnerButton;
