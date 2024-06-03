import {logoutAccount} from '@/lib/actions/user.actions'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import React from 'react'
import {FooterProps} from "@/types";

const Footer = ({user, type = 'desktop'}: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push('/sign-in')
  }

  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <div className={type === 'mobile' ? 'flex size-10 items-center justify-center rounded-full bg-gray-200' : 'flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstname[0]}
        </p>
      </div>

      <div className={type === 'mobile' ? 'flex flex-1 flex-col justify-center' : 'flex flex-1 flex-col justify-center max-xl:hidden'}>
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstname}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div className="relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="MaVieEtudiante logout"/>
      </div>
    </footer>
  )
}

export default Footer