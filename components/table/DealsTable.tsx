'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {formatDateTime} from "@/lib/utils"
import {Deal, DealTableProps} from "@/types";
import {useRouter} from "next/navigation";

const DealsTable = ({deals}: DealTableProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/bon-plans/${id}`);
  };
  console.log(deals);
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Titre</TableHead>
          <TableHead className="px-2">Catégorie</TableHead>
          <TableHead className="px-2">Entreprise</TableHead>
          <TableHead className="px-2">Format</TableHead>
          <TableHead className="px-2">Offre</TableHead>
          <TableHead className="px-2">Type</TableHead>
          <TableHead className="px-2">Propriétaire</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deals.map((e: Deal) => {
          return (
            <TableRow key={e.id} className='bg-[#FFFBFA] cursor-pointer' onClick={() => handleRowClick(parseInt(e.id.toString(), 10))}>
              <TableCell className="min-w-32 pl-2 pr-10">
                {e.title}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.dealCategory.name}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.company.name}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.format.name}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.offerType.name}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.dealType.name}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                { e.association ? e.association.name : "MVE"}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default DealsTable