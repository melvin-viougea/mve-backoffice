import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, Campus} from "@/types";
import {getAllCampus} from "@/lib/actions/campus.actions";

export const CampusDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [selected, setSelected] = useState<Campus | undefined>(undefined);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const fetchedCampuses = await getAllCampus();
        setCampuses(fetchedCampuses);
      } catch (error) {
        console.error("Failed to fetch event types:", error);
      }
    };

    fetchCampuses();
  }, []);

  useEffect(() => {
    if (campuses.length > 0 && !selected) {
      const defaultCampus = campuses.find(campus => campus.id == defaultValue) || campuses[0];
      setSelected(defaultCampus);
      if (setValue) {
        setValue("campus", defaultCampus.id);
      }
    }
  }, [campuses, selected, setValue]);

  const handleCampusChange = (id: string) => {
    const campus = campuses.find((campus) => campus.id === id);

    if (campus) {
      setSelected(campus);
      if (setValue) {
        setValue("campus", id);
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id}
      onValueChange={(value) => handleCampusChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Selectionné un Campus</SelectLabel>
          {campuses.map((campus: Campus) => (
            <SelectItem key={campus.id} value={campus.id} className="cursor-pointer border-t">
              {campus.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
