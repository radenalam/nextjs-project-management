import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Sidebar from "./sideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark">
          <div className="flex">
            <Sidebar />
            <main className="flex-grow">{children}</main>
          </div>
        </Theme>
      </body>
    </html>
  );
}
