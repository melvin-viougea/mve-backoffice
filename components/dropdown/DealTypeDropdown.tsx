import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, DealType} from "@/types";
import {getAllDealType} from "@/lib/actions/dealType.actions";

export const DealTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [dealTypes, setDealTypes] = useState<DealType[]>([]);
  const [selected, setSelected] = useState<DealType | undefined>(undefined);

  useEffect(() => {
    const fetchDealTypes = async () => {
      try {
        const fetchedDealTypes = await getAllDealType();
        setDealTypes(fetchedDealTypes);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchDealTypes();
  }, []);

  useEffect(() => {
    if (dealTypes.length > 0 && !selected) {
      const defaultDealType = dealTypes.find(dealType => dealType.id.toString() == defaultValue) || dealTypes[0];
      setSelected(defaultDealType);
      if (setValue) {
        setValue("dealType", defaultDealType.id);
      }
    }
  }, [dealTypes, selected, setValue]);

  const handleDealTypeChange = (id: string) => {
    const dealType = dealTypes.find((dealType) => dealType.id.toString() === id);

    if (dealType) {
      setSelected(dealType);
      if (setValue) {
        setValue("dealType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleDealTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le type de bon plan</SelectLabel>
          {dealTypes.map((dealType: DealType) => (
            <SelectItem key={dealType.id} value={dealType.id.toString()} className="cursor-pointer border-t">
              {dealType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
