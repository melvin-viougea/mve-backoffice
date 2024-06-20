'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Campus, CampusTableProps} from "@/types";
import {useRouter} from "next/navigation";

const CampusesTable = ({campuses}: CampusTableProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/admin/campus/${id}`);
  };
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Nom</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {campuses.map((campus: Campus) => {
          return (
            <TableRow key={campus.id} className='bg-[#FFFBFA] cursor-pointer' onClick={() => handleRowClick(parseInt(campus.id, 10))}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {campus.name}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default CampusesTable