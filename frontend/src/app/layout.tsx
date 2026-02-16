import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/store/provider";

export const metadata: Metadata = {
  title: "ONES Marketplace",
  description: "ONES Marketplace User Portal"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
