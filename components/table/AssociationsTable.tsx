'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Association, AssociationTableProps, Campus, CampusTableProps} from "@/types";
import {useRouter} from "next/navigation";

const AssociationsTable = ({associations}: AssociationTableProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/admin/association/${id}`);
  };
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Nom</TableHead>
          <TableHead className="px-2">Campus</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {associations.map((association: Association) => {
          return (
            <TableRow key={association.id} className='bg-[#FFFBFA] cursor-pointer' onClick={() => handleRowClick(parseInt(association.id, 10))}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {association.name}
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {association.campus.name}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default AssociationsTable