import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, OfferType} from "@/types";
import {getAllOfferType} from "@/lib/actions/offerType.actions";

export const OfferTypeDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [offerTypes, setOfferTypes] = useState<OfferType[]>([]);
  const [selected, setSelected] = useState<OfferType | undefined>(undefined);

  useEffect(() => {
    const fetchOfferTypes = async () => {
      try {
        const fetchedOfferTypes = await getAllOfferType();
        setOfferTypes(fetchedOfferTypes);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchOfferTypes();
  }, []);

  useEffect(() => {
    if (offerTypes.length > 0 && !selected) {
      const defaultOfferType = offerTypes.find(offerType => offerType.id.toString() == defaultValue) || offerTypes[0];
      setSelected(defaultOfferType);
      if (setValue) {
        setValue("offerType", defaultOfferType.id);
      }
    }
  }, [offerTypes, selected, setValue]);

  const handleOfferTypeChange = (id: string) => {
    const offerType = offerTypes.find((offerType) => offerType.id.toString() === id);

    if (offerType) {
      setSelected(offerType);
      if (setValue) {
        setValue("offerType", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleOfferTypeChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner le type d&apos;offre du bon plan</SelectLabel>
          {offerTypes.map((offerType: OfferType) => (
            <SelectItem key={offerType.id} value={offerType.id.toString()} className="cursor-pointer border-t">
              {offerType.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
