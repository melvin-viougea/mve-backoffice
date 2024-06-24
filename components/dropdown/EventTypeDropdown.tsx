import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, EventType} from "@/types";
import {getAllEventType} from "@/lib/actions/eventType.actions";

export const EventTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selected, setSelected] = useState<EventType | undefined>(undefined);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const fetchedEventTypes = await getAllEventType();
        setEventTypes(fetchedEventTypes);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchEventTypes();
  }, []);

  useEffect(() => {
    if (eventTypes.length > 0 && !selected) {
      const defaultEventType = eventTypes.find(eventType => eventType.id == defaultValue) || eventTypes[0];
      setSelected(defaultEventType);
      if (setValue) {
        setValue("eventType", defaultEventType.id);
      }
    }
  }, [eventTypes, selected, setValue]);

  const handleEventTypeChange = (id: string) => {
    const eventType = eventTypes.find((eventType) => eventType.id === id);

    if (eventType) {
      setSelected(eventType);
      if (setValue) {
        setValue("eventType", id);
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id}
      onValueChange={(value) => handleEventTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner un type d&apos;événement</SelectLabel>
          {eventTypes.map((eventType: EventType) => (
            <SelectItem key={eventType.id} value={eventType.id} className="cursor-pointer border-t">
              {eventType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
