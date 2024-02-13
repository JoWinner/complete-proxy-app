import "./globals.css";
import type { Metadata } from "next";
import { Unbounded, Open_Sans, Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ActivityModalProvider } from "@/components/providers/store-modal-provider";
import ShopModalProvider from "@/components/providers/shop-modal-provider";
import { ToasterProvider } from "@/components/providers/toast-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";


const urbanist = Urbanist({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-urbanist",
});
const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-openSans",
});
const unbounded = Unbounded({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "Hanabis Marketplace",
  description: "Own your store, collect payments your own way, connect products to sell/buy in groups through a better organized chats/channels and interactive marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(`${urbanist.variable} ${unbounded.variable} ${openSans.variable}, "bg-[#f4f4f4] dark:bg-[#13111c]"`)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            // enableSystem={false}
            enableSystem
            storageKey="discord-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <ToasterProvider />
              <ShopModalProvider />
              <ActivityModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
