import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, SubEventType} from "@/types";
import {getAllSubEventType} from "@/lib/actions/subEventType.actions";

export const SubEventTypeDropdown = ({setValue, otherStyles}: DropdownProps) => {
  const [subEventTypes, setSubEventTypes] = useState<SubEventType[]>([]);
  const [selected, setSelected] = useState<SubEventType | undefined>(undefined);

  useEffect(() => {
    const fetchSubEventTypes = async () => {
      try {
        const fetchedSubEventTypes = await getAllSubEventType();
        setSubEventTypes(fetchedSubEventTypes);
      } catch (error) {
        console.error("Failed to fetch sub event types:", error);
      }
    };

    fetchSubEventTypes();
  }, []);

  useEffect(() => {
    if (subEventTypes.length > 0 && !selected) {
      const defaultSubEventType = subEventTypes[0];
      setSelected(defaultSubEventType);
      if (setValue) {
        setValue("subEventType", defaultSubEventType.id);
      }
    }
  }, [subEventTypes, selected, setValue]);

  const handleSubEventTypeChange = (id: string) => {
    const subEventType = subEventTypes.find((subEventType) => subEventType.id === id);

    if (subEventType) {
      setSelected(subEventType);
      if (setValue) {
        setValue("subEventType", id);
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id}
      onValueChange={(value) => handleSubEventTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Select an event type</SelectLabel>
          {subEventTypes.map((subEventType: SubEventType) => (
            <SelectItem key={subEventType.id} value={subEventType.id} className="cursor-pointer border-t">
              {subEventType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};