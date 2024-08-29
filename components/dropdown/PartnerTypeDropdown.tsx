import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, PartnerType} from "@/types";
import {getAllPartnerType} from "@/lib/actions/partnerType.actions";

export const PartnerTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [partnerTypes, setPartnerTypes] = useState<PartnerType[]>([]);
  const [selected, setSelected] = useState<PartnerType | undefined>(undefined);

  useEffect(() => {
    const fetchPartnerTypes = async () => {
      try {
        const fetchedPartnerTypes = await getAllPartnerType();
        setPartnerTypes(fetchedPartnerTypes);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchPartnerTypes();
  }, []);

  useEffect(() => {
    if (partnerTypes.length > 0 && !selected) {
      const defaultPartnerType = partnerTypes.find(partnerType => partnerType.id.toString() == defaultValue) || partnerTypes[0];
      setSelected(defaultPartnerType);
      if (setValue) {
        setValue("partnerType", defaultPartnerType.id);
      }
    }
  }, [partnerTypes, selected, setValue]);

  const handlePartnerTypeChange = (id: string) => {
    const partnerType = partnerTypes.find((partnerType) => partnerType.id.toString() === id);

    if (partnerType) {
      setSelected(partnerType);
      if (setValue) {
        setValue("partnerType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handlePartnerTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner un type d&apos;événement</SelectLabel>
          {partnerTypes.map((partnerType: PartnerType) => (
            <SelectItem key={partnerType.id} value={partnerType.id.toString()} className="cursor-pointer border-t">
              {partnerType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
