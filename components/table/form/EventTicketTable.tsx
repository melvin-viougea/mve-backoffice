'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {EventTicket, EventTicketTableProps} from "@/types";
import {useRouter} from "next/navigation";

const EventTicketTable = ({eventTicket}: EventTicketTableProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/evenement/ticket/${id}`);
  };

  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Ticket</TableHead>
          <TableHead className="px-2">Prix</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventTicket.map((ep: EventTicket) => {
          return (
            <TableRow key={ep.id} className='bg-[#FFFBFA] cursor-pointer' onClick={() => handleRowClick(parseInt(ep.id.toString(), 10))}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {ep.name}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.price}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default EventTicketTable