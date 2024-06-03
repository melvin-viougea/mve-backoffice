import Image from "next/image";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-gradient-to-br from-primary/30 to-primary max-lg:hidden">
        <div>
          <Image
            src="/icons/auth-image.svg"
            alt="Auth image"
            width={1000}
            height={1000}
            className="rounded-l-xl object-contain"
          />
        </div>
      </div>
    </main>
  );
}
