import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, SubDealCategory} from "@/types";
import {getAllSubDealCategory} from "@/lib/actions/subDealCategory.actions";

export const SubDealCategoryDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [subDealCategorys, setSubDealCategorys] = useState<SubDealCategory[]>([]);
  const [selected, setSelected] = useState<SubDealCategory | undefined>(undefined);

  useEffect(() => {
    const fetchSubDealCategorys = async () => {
      try {
        const fetchedSubDealCategorys = await getAllSubDealCategory();
        setSubDealCategorys(fetchedSubDealCategorys);
      } catch (error) {
        console.error("Failed to fetch sub event types:", error);
      }
    };

    fetchSubDealCategorys();
  }, []);

  useEffect(() => {
    if (subDealCategorys.length > 0) {
      const defaultSubDealCategory = subDealCategorys.find(subDealCategory => subDealCategory.id.toString() == defaultValue) || subDealCategorys[0];
      setSelected(defaultSubDealCategory);
      if (setValue) {
        setValue("subDealCategory", defaultSubDealCategory.id);
      }
    }
  }, [subDealCategorys, defaultValue, setValue]);

  const handleSubDealCategoryChange = (id: string) => {
    const subDealCategory = subDealCategorys.find((subDealCategory) => subDealCategory.id.toString() === id);

    if (subDealCategory) {
      setSelected(subDealCategory);
      if (setValue) {
        setValue("subDealCategory", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={defaultValue}
      onValueChange={(value) => handleSubDealCategoryChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner la sous-catégorie de bon plan</SelectLabel>
          {subDealCategorys.map((subDealCategory: SubDealCategory) => (
            <SelectItem key={subDealCategory.id} value={subDealCategory.id.toString()} className="cursor-pointer border-t">
              {subDealCategory.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};