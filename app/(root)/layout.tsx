import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import {getLoggedInUser} from "@/lib/actions/auth.actions";
import Image from "next/image";
import {redirect} from "next/navigation";

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect('/sign-in');
  }
  if (loggedIn.isSuperAdmin) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>
      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-[8px_10px_16px_0px_rgba(0, 0, 0, 0.05)] sm:p-8 md:hidden">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo"/>
          <div>
            <MobileNav user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}