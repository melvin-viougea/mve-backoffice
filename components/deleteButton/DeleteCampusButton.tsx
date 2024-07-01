'use client'

import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {deleteCampus} from "@/lib/actions/campus.actions";
import {useRouter} from "next/navigation";

const DeleteCampusButton = ({ campus }: any) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const deletedCampus = await deleteCampus(id);
    if (deletedCampus) {
      router.push('/admin/campus');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button onClick={() => handleDelete(campus.id)} className="text-[14px] leading-[20px] w-full bg-destructive font-semibold text-destructive-foreground hover:bg-destructive/80 shadow-form !important">
        <div className="flex items-center gap-2">
          <Image src="/icons/delete.svg" alt="delete" width={20} height={20} className="cursor-pointer invert"/>
          <span>Supprimer</span>
        </div>
      </Button>
    </div>
  );
};

export default DeleteCampusButton;
