import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, SubPartnerType} from "@/types";
import {getAllSubPartnerType} from "@/lib/actions/subPartnerType.actions";

export const SubPartnerTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [subPartnerTypes, setSubPartnerTypes] = useState<SubPartnerType[]>([]);
  const [selected, setSelected] = useState<SubPartnerType | undefined>(undefined);

  useEffect(() => {
    const fetchSubPartnerTypes = async () => {
      try {
        const fetchedSubPartnerTypes = await getAllSubPartnerType();
        setSubPartnerTypes(fetchedSubPartnerTypes);
      } catch (error) {
        console.error("Failed to fetch sub event types:", error);
      }
    };

    fetchSubPartnerTypes();
  }, []);

  useEffect(() => {
    if (subPartnerTypes.length > 0) {
      const defaultSubPartnerType = subPartnerTypes.find(subPartnerType => subPartnerType.id.toString() == defaultValue) || subPartnerTypes[0];
      setSelected(defaultSubPartnerType);
      if (setValue) {
        setValue("subPartnerType", defaultSubPartnerType.id);
      }
    }
  }, [subPartnerTypes, defaultValue, setValue]);

  const handleSubPartnerTypeChange = (id: string) => {
    const subPartnerType = subPartnerTypes.find((subPartnerType) => subPartnerType.id.toString() === id);

    if (subPartnerType) {
      setSelected(subPartnerType);
      if (setValue) {
        setValue("subPartnerType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={defaultValue}
      onValueChange={(value) => handleSubPartnerTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner la sous-type de partenaire</SelectLabel>
          {subPartnerTypes.map((subPartnerType: SubPartnerType) => (
            <SelectItem key={subPartnerType.id} value={subPartnerType.id.toString()} className="cursor-pointer border-t">
              {subPartnerType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};