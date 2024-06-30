'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Association, User, UserTableProps} from "@/types";
import {useRouter} from "next/navigation";

const UsersTable = ({ users }: UserTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Nom</TableHead>
          <TableHead className="px-2">Prénom</TableHead>
          <TableHead className="px-2">Assos</TableHead>
          <TableHead className="px-2">Campus</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: User) => {
          return (
            <TableRow key={user.id} className='bg-[#FFFBFA]'>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {user.lastname}
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {user.firstname}
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {user.association.name}
              </TableCell>
              <TableCell className="max-w-[250px] pl-2 pr-10">
                {user.association.campus.name}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UsersTable;