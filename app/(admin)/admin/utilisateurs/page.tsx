import HeaderBox from '@/components/HeaderBox'
import {Pagination} from '@/components/Pagination';
import UsersTable from '@/components/table/UsersTable';
import {getAllUser} from "@/lib/actions/user.actions";
import React from 'react'
import {SearchParamProps} from "@/types";

const User = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const users = await getAllUser();

  const rowsPerPage = 10;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;

  const currentUsers = users.slice(
    indexOfFirstUser, indexOfLastUser
  )
  return (
    <div className="flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12">
      <HeaderBox
        title="Utilisateurs"
        subtext="Voir tous les utilisateurs."
      />
      <div className="space-y-6">
        <section className="flex w-full flex-col gap-6">
          <UsersTable
            users={currentUsers}
          />
          {totalPages > 1 && (
            <div className="my-4 w-full">
              <Pagination totalPages={totalPages} page={currentPage}/>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default User