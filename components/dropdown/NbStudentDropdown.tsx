import {useEffect, useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger} from "@/components/ui/select";
import {DropdownProps, NbStudent} from "@/types";
import {getAllNbStudent} from "@/lib/actions/nbStudent.actions";

export const NbStudentDropdown = ({setValue, defaultValue, otherStyles}: DropdownProps) => {
  const [nbStudents, setNbStudents] = useState<NbStudent[]>([]);
  const [selected, setSelected] = useState<NbStudent | undefined>(undefined);

  useEffect(() => {
    const fetchNbStudents = async () => {
      try {
        const fetchedNbStudents = await getAllNbStudent();
        setNbStudents(fetchedNbStudents);
      } catch (error) {
        console.error("Failed to fetch association types:", error);
      }
    };

    fetchNbStudents();
  }, []);

  useEffect(() => {
    if (nbStudents.length > 0 && !selected) {
      const defaultNbStudent = nbStudents.find(nbStudent => nbStudent.id.toString() == defaultValue) || nbStudents[0];
      setSelected(defaultNbStudent);
      if (setValue) {
        setValue("nbStudent", defaultNbStudent.id);
      }
    }
  }, [nbStudents, selected, setValue]);

  const handleNbStudentChange = (id: string) => {
    const nbStudent = nbStudents.find((nbStudent) => nbStudent.id.toString() === id);

    if (nbStudent) {
      setSelected(nbStudent);
      if (setValue) {
        setValue("nbStudent", parseInt(id, 10));
      }
    }
  };

  return (
    <Select
      key={selected?.id}
      defaultValue={selected?.id.toString()}
      onValueChange={(value) => handleNbStudentChange(value)}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <p className="line-clamp-1 w-full text-left">{selected?.number}</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`} align="end">
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">Séléctionner un type de campus</SelectLabel>
          {nbStudents.map((nbStudent: NbStudent) => (
            <SelectItem key={nbStudent.id} value={nbStudent.id.toString()} className="cursor-pointer border-t">
              {nbStudent.number}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
