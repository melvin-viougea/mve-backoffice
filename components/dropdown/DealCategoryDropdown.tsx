import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, DealCategory} from "@/types";
import {getAllDealCategory} from "@/lib/actions/dealCategory.actions";

export const DealCategoryDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [dealCategorys, setDealCategorys] = useState<DealCategory[]>([]);
  const [selected, setSelected] = useState<DealCategory | undefined>(undefined);

  useEffect(() => {
    const fetchDealCategorys = async () => {
      try {
        const fetchedDealCategorys = await getAllDealCategory();
        setDealCategorys(fetchedDealCategorys);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchDealCategorys();
  }, []);

  useEffect(() => {
    if (dealCategorys.length > 0 && !selected) {
      const defaultDealCategory = dealCategorys.find(dealCategory => dealCategory.id.toString() == defaultValue) || dealCategorys[0];
      setSelected(defaultDealCategory);
      if (setValue) {
        setValue("dealCategory", defaultDealCategory.id);
      }
    }
  }, [dealCategorys, selected, setValue]);

  const handleDealCategoryChange = (id: string) => {
    const dealCategory = dealCategorys.find((dealCategory) => dealCategory.id.toString() === id);

    if (dealCategory) {
      setSelected(dealCategory);
      if (setValue) {
        setValue("dealCategory", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleDealCategoryChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le type de catégorie de bon plan</SelectLabel>
          {dealCategorys.map((dealCategory: DealCategory) => (
            <SelectItem key={dealCategory.id} value={dealCategory.id.toString()} className="cursor-pointer border-t">
              {dealCategory.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
