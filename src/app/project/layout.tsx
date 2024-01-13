import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ".././globals.css";
import ProjectPage from "@/views/ProjectPage/Project";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProjectPage>{children}</ProjectPage>
      </body>
    </html>
  );
}