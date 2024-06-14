'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {cn, formatDateTime} from "@/lib/utils"
import {statusStyles} from "@/constants";
import {BadgeProps, Events, EventTableProps} from "@/types";
import {useRouter} from "next/navigation";

const StatusBadge = ({status}: BadgeProps) => {
  const statusKey = status ? "true" : "false";
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
  } = statusStyles[statusKey] || statusStyles.default;

  return (
    <div className={cn('flex items-center justify-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)}/>
      <p className={cn('text-[12px] font-medium', textColor)}>{status ? 'Visible' : 'Brouillon'}</p>
    </div>
  );
};

const EventsTable = ({events}: EventTableProps) => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/evenement/${id}`);
  };
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2">Titre</TableHead>
          <TableHead className="px-2">Type d&apos;événement</TableHead>
          <TableHead className="px-2">Sous-type d&apos;événement</TableHead>
          <TableHead className="px-2">Lieu</TableHead>
          <TableHead className="px-2 max-md:hidden">Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((e: Events) => {
          return (
            <TableRow key={e.id} className='bg-[#FFFBFA] cursor-pointer' onClick={() => handleRowClick(e.id)}>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {formatDateTime(new Date(e.date)).dateOnly}
              </TableCell>
              <TableCell className="min-w-32 pl-2 pr-10">
                {e.title}
              </TableCell>
              <TableCell className="pl-2 pr-10 capitalize min-w-24">
                {e.eventType.name}
              </TableCell>
              <TableCell className="pl-2 pr-10">
                {e.subEventType.name}
              </TableCell>
              <TableCell className="pl-2 pr-10">
                {e.place ? e.place : "-"}
              </TableCell>
              <TableCell className="pl-2 pr-10 max-md:hidden">
                <StatusBadge status={e.isPublished}/>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default EventsTable