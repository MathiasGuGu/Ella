import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { generateMetadata } from "../utils/metadata";
import QueryProvider from "./providers/QueryProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-title",
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "300",
    "400",
    "500",
    "600",
    "700",
  ],
});

export const metadata: Metadata = generateMetadata({
  title: "Project Overviewer",
  description: "A tool to generate a project overview.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased font-[family-name:var(--font-title)]`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
