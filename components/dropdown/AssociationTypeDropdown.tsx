import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, AssociationType} from "@/types";
import {getAllAssociationType} from "@/lib/actions/associationType.actions";

export const AssociationTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [associationTypes, setAssociationTypes] = useState<AssociationType[]>([]);
  const [selected, setSelected] = useState<AssociationType | undefined>(undefined);

  useEffect(() => {
    const fetchAssociationTypes = async () => {
      try {
        const fetchedAssociationTypes = await getAllAssociationType();
        setAssociationTypes(fetchedAssociationTypes);
      } catch (error) {
        console.error("Failed to fetch association types:", error);
      }
    };

    fetchAssociationTypes();
  }, []);

  useEffect(() => {
    if (associationTypes.length > 0 && !selected) {
      const defaultAssociationType = associationTypes.find(associationType => associationType.id.toString() == defaultValue) || associationTypes[0];
      setSelected(defaultAssociationType);
      if (setValue) {
        setValue("associationType", defaultAssociationType.id);
      }
    }
  }, [associationTypes, selected, setValue]);

  const handleAssociationTypeChange = (id: string) => {
    const associationType = associationTypes.find((associationType) => associationType.id.toString() === id);

    if (associationType) {
      setSelected(associationType);
      if (setValue) {
        setValue("associationType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleAssociationTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le type d&apos;association</SelectLabel>
          {associationTypes.map((associationType: AssociationType) => (
            <SelectItem key={associationType.id} value={associationType.id.toString()} className="cursor-pointer border-t">
              {associationType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
