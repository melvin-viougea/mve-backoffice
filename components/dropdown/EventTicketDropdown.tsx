import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, EventTicket} from "@/types";
import {getAllEventTicket} from "@/lib/actions/eventTicket.actions";

export const EventTicketDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [eventTickets, setEventTickets] = useState<EventTicket[]>([]);
  const [selected, setSelected] = useState<EventTicket | undefined>(undefined);

  useEffect(() => {
    const fetchEventTickets = async () => {
      try {
        const fetchedEventTickets = await getAllEventTicket();
        setEventTickets(fetchedEventTickets);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchEventTickets();
  }, []);

  useEffect(() => {
    if (eventTickets.length > 0 && !selected) {
      const defaultEventTicket = eventTickets.find(eventTicket => eventTicket.id.toString() == defaultValue) || eventTickets[0];
      setSelected(defaultEventTicket);
      if (setValue) {
        setValue("eventTicket", defaultEventTicket.id);
      }
    }
  }, [eventTickets, selected, setValue]);

  const handleEventTicketChange = (id: string) => {
    const eventTicket = eventTickets.find((eventTicket) => eventTicket.id.toString() === id);

    if (eventTicket) {
      setSelected(eventTicket);
      if (setValue) {
        setValue("eventTicket", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleEventTicketChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner un type d&apos;événement</SelectLabel>
          {eventTickets.map((eventTicket: EventTicket) => (
            <SelectItem key={eventTicket.id} value={eventTicket.id.toString()} className="cursor-pointer border-t">
              {eventTicket.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
