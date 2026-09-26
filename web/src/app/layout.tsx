import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans-thai/400.css";
import "@fontsource/ibm-plex-sans-thai/500.css";
import "@fontsource/ibm-plex-sans-thai/600.css";
import "@fontsource/noto-serif-thai/400.css";
import "@fontsource/noto-serif-thai/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ไพ่ส่องใจ",
  description: "ไม่ทำนาย ไม่ตัดสิน แค่ถาม",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
