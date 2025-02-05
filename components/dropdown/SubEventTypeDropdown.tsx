import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, SubEventType} from "@/types";
import {getAllSubEventType} from "@/lib/actions/subEventType.actions";

export const SubEventTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
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
    if (subEventTypes.length > 0) {
      const defaultSubEventType = subEventTypes.find(subEventType => subEventType.id.toString() == defaultValue) || subEventTypes[0];
      setSelected(defaultSubEventType);
      if (setValue) {
        setValue("subEventType", defaultSubEventType.id);
      }
    }
  }, [subEventTypes, defaultValue, setValue]);

  const handleSubEventTypeChange = (id: string) => {
    const subEventType = subEventTypes.find((subEventType) => subEventType.id.toString() === id);

    if (subEventType) {
      setSelected(subEventType);
      if (setValue) {
        setValue("subEventType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={defaultValue}
      onValueChange={(value) => handleSubEventTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le sous-type d&apos;événement</SelectLabel>
          {subEventTypes.map((subEventType: SubEventType) => (
            <SelectItem key={subEventType.id} value={subEventType.id.toString()} className="cursor-pointer border-t">
              {subEventType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};