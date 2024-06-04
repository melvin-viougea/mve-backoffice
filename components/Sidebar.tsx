'use client'

import {sidebarLinks} from '@/constants'
import {cn} from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Footer from './Footer'
import {SiderbarProps} from "@/types";

const Sidebar = ({user}: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]">
      <div className="mb-10 flex items-center gap-2 max-xl:mb-4">
        <Link href="/" className="cursor-pointer flex mx-auto gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="MaVieEtudiante logo"
            className="size-[24px] max-xl:size-14 hidden max-xl:block"
          />
          <Image
            src="/icons/toplogo.svg"
            width={500}
            height={500}
            alt="MaVieEtudiante logo"
            className="w-[200px] h-[90px] max-xl:hidden"
          />
        </Link>
      </div>
      <nav className="flex flex-col gap-1 overflow-y-auto flex-1">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start', {'bg-primary': isActive})}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'invert': isActive
                  })}
                />
              </div>
              <p className={cn("text-16 font-semibold text-black max-xl:hidden", {"!text-white": isActive})}>
                {item.label}
              </p>
            </Link>
          )
        })}
      </nav>
      <Footer user={user}/>
    </section>
  )
}

export default Sidebar