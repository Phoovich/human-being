import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans-thai/400.css";
import "@fontsource/ibm-plex-sans-thai/500.css";
import "@fontsource/ibm-plex-sans-thai/600.css";
import "@fontsource/noto-serif-thai/400.css";
import "@fontsource/noto-serif-thai/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Human Being · ไพ่ส่องใจ & เช็กให้ชัด",
  description: "Two private activities for noticing what matters.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
