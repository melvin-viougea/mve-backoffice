import type {Metadata} from "next";
import {Anek_Telugu} from "next/font/google";
import "./globals.css";
import {GeistSans} from "geist/font/sans";
import {GeistMono} from "geist/font/mono";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";

const AnekTelugu = Anek_Telugu({
  subsets: ["latin"],
  variable: "--font-caption",
});

export const metadata: Metadata = {
    title: "MaVieEtudiante",
    description: "MaVieEtudiante is a platform for student to manage their university life.",
    icons: {
        icon: '/icons/logo.svg'
    }
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={cn(
                GeistSans.variable,
                GeistMono.variable,
                AnekTelugu.variable,
                "font-sans bg-background text-foreground"
            )}
        >
        {children}
        </body>
        </html>
    );
}