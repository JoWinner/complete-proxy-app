import "./globals.css";
import type { Metadata } from "next";
import { Unbounded, Open_Sans, Urbanist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { DashboardModalProvider } from "@/components/providers/store-modal-provider";
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
  title: "Soplano B2B Ecommerce",
  description:
    "Revolutionizing B2B Ecommerce with a Global Trading Platform. Connect with other buyers worldwide to negotiate, and transact with verified suppliers. Experience seamless order management, quality assurance, and transparent fulfillment for your business growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            `${urbanist.variable} ${unbounded.variable} ${openSans.variable}, "bg-[#f4f4f4] dark:bg-[#13111c]"`
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem={false}
            enableSystem
            storageKey="discord-theme"
          >
            <SocketProvider>
              <ModalProvider />
              <ToasterProvider />
              <ShopModalProvider />
              <DashboardModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
