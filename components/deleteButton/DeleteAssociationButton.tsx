'use client'

import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {deleteAssociation} from "@/lib/actions/association.actions";
import {useRouter} from "next/navigation";

const DeleteAssociationButton = ({ association }: any) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const deletedAssociation = await deleteAssociation(id);
    if (deletedAssociation) {
      router.push('/admin/association');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button onClick={() => handleDelete(association.id)} className="text-[14px] leading-[20px] w-full bg-destructive font-semibold text-destructive-foreground hover:bg-destructive/80 shadow-form !important">
        <div className="flex items-center gap-2">
          <Image src="/icons/delete.svg" alt="delete" width={20} height={20} className="cursor-pointer invert"/>
          <span>Supprimer</span>
        </div>
      </Button>
    </div>
  );
};

export default DeleteAssociationButton;
