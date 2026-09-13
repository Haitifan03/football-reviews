import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Football Reviews",
  description: "College football game reviews and thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
