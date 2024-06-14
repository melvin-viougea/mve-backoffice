import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DisplayType, DropdownProps} from "@/types";
import {getAllDisplayType} from "@/lib/actions/displayType.actions";

export const DisplayTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [displayTypes, setDisplayTypes] = useState<DisplayType[]>([]);
  const [selected, setSelected] = useState<DisplayType | undefined>(undefined);

  useEffect(() => {
    const fetchDisplayTypes = async () => {
      try {
        const fetchedDisplayTypes = await getAllDisplayType();
        setDisplayTypes(fetchedDisplayTypes);
      } catch (error) {
        console.error("Failed to fetch display types:", error);
      }
    };

    fetchDisplayTypes();
  }, []);

  useEffect(() => {
    if (displayTypes.length > 0) {
      const defaultDisplayType = displayTypes.find(displayType => displayType.id == defaultValue) || displayTypes[0];
      setSelected(defaultDisplayType);
      if (setValue) {
        setValue("displayType", defaultDisplayType.id);
      }
    }
  }, [displayTypes, defaultValue, setValue]);

  const handleDisplayTypeChange = (id: string) => {
    const displayType = displayTypes.find((displayType) => displayType.id === id);

    if (displayType) {
      setSelected(displayType);
      if (setValue) {
        setValue("displayType", id);
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={defaultValue}
      onValueChange={(value) => handleDisplayTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Select a display type</SelectLabel>
          {displayTypes.map((displayType: DisplayType) => (
            <SelectItem key={displayType.id} value={displayType.id} className="cursor-pointer border-t">
              {displayType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};