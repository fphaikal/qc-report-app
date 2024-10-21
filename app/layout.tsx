import type { Metadata } from "next";
import "../css/globals.css";
import "../css/satoshi.css";

export const metadata: Metadata = {
  title: "Quality Pintar - Denapella",
  description: "Quality Pintar - Denapella",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
