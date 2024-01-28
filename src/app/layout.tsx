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
  description: "Bringing public goods funding to the table. Powered by NEAR Protocol.",
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
