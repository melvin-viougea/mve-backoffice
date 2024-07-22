'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {EventPeople, EventPeopleTableProps} from "@/types";
import {formatDateTime} from "@/lib/utils";

const EventPeopleTable = ({eventPeople}: EventPeopleTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2">Nom</TableHead>
          <TableHead className="px-2">Prénom</TableHead>
          <TableHead className="px-2">Email</TableHead>
          <TableHead className="px-2">Ticket</TableHead>
          <TableHead className="px-2">Prix</TableHead>
          <TableHead className="px-2">Paiement</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventPeople.map((ep: EventPeople) => {
          return (
            <TableRow key={ep.id} className='bg-[#FFFBFA] cursor-pointer'>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {formatDateTime(new Date(ep.date)).dateOnly}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.firstname}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.lastname}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.email}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.eventTicket.name}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.eventTicket.price}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {ep.payment.name}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default EventPeopleTable