import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutProvides from "@/layout/LayoutProvides";
import "@near-wallet-selector/modal-ui/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PotLock",
  description:
    "Potlock, is bringing new funding mechanisms to the table for public goods, built on NEAR Protocol",
  openGraph: {
    title: "Potlock",
    description:
      "Potlock, is bringing new funding mechanisms to the table for public goods, built on NEAR Protocol",
    images: "https://alpha.potlock.org/Potlock.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-[1440px] m-auto">
          <LayoutProvides>{children}</LayoutProvides>
        </div>
      </body>
    </html>
  );
}
