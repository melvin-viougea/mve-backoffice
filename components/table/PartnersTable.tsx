'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {formatDateTime} from "@/lib/utils"
import {Partner, PartnerTableProps} from "@/types";
import {useRouter} from "next/navigation";

const PartnersTable = ({partners}: PartnerTableProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/partenaire/${id}`);
  };
  
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2">Nom</TableHead>
          <TableHead className="px-2">Type de partenaire</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.map((e: Partner) => {
          return (
            <TableRow key={e.id} className='bg-[#FFFBFA] cursor-pointer' onClick={() => handleRowClick(parseInt(e.id.toString(), 10))}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {formatDateTime(new Date(e.date)).dateOnly}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {e.name}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.partnerType.name}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default PartnersTable