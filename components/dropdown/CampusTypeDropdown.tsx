import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, CampusType} from "@/types";
import {getAllCampusType} from "@/lib/actions/campusType.actions";

export const CampusTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [campusTypes, setCampusTypes] = useState<CampusType[]>([]);
  const [selected, setSelected] = useState<CampusType | undefined>(undefined);

  useEffect(() => {
    const fetchCampusTypes = async () => {
      try {
        const fetchedCampusTypes = await getAllCampusType();
        setCampusTypes(fetchedCampusTypes);
      } catch (error) {
        console.error("Failed to fetch association types:", error);
      }
    };

    fetchCampusTypes();
  }, []);

  useEffect(() => {
    if (campusTypes.length > 0 && !selected) {
      const defaultCampusType = campusTypes.find(campusType => campusType.id.toString() == defaultValue) || campusTypes[0];
      setSelected(defaultCampusType);
      if (setValue) {
        setValue("campusType", defaultCampusType.id);
      }
    }
  }, [campusTypes, selected, setValue]);

  const handleCampusTypeChange = (id: string) => {
    const campusType = campusTypes.find((campusType) => campusType.id.toString() === id);

    if (campusType) {
      setSelected(campusType);
      if (setValue) {
        setValue("campusType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleCampusTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le type de campus</SelectLabel>
          {campusTypes.map((campusType: CampusType) => (
            <SelectItem key={campusType.id} value={campusType.id.toString()} className="cursor-pointer border-t">
              {campusType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
