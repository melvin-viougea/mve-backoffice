'use client'

import {Sheet, SheetClose, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import {sidebarAdminLinks, sidebarLinks} from "@/constants"
import {cn} from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"
import Footer from "./Footer"
import {MobileNavProps} from "@/types";

const MobileNav = ({user}: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white flex flex-col">
          <Link href="/" className="cursor-pointer flex mx-auto gap-2">
            <Image
              src="/icons/toplogo.svg"
              width={500}
              height={500}
              alt="MaVieEtudiante logo"
              className="w-[200px] h-[90px]"
            />
          </Link>
          <div className="flex flex-1 flex-col justify-between overflow-y-auto">
            <nav className="flex flex-col gap-6 pt-16 text-white">
              {sidebarAdminLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

                return (
                  <SheetClose asChild key={item.route}>
                    <Link href={item.route} key={item.label}
                          className={cn('flex gap-3 items-center p-4 rounded-lg max-w-60 w-full', {'bg-primary': isActive})}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                        className={cn({
                          'invert': isActive
                        })}
                      />
                      <p className={cn("text-16 font-semibold text-black", {"text-white": isActive})}>
                        {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
            <Footer user={user} type="mobile"/>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav
