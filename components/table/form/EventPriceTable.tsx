'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {EventPrice, EventPriceTableProps} from "@/types";

const EventPriceTable = ({eventPrice}: EventPriceTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Ticket</TableHead>
          <TableHead className="px-2">Prix</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {eventPrice.map((ep: EventPrice) => {
          return (
            <TableRow key={ep.id} className='bg-[#FFFBFA] cursor-pointer'>
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

export default EventPriceTable