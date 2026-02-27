import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { TranslationProvider } from "@/components/translation/TranslationProvider";
import { ThemeProvider } from "@/hooks/useTheme";
import { Header } from "@/components/layout/Header";
import { SideNav } from "@/components/layout/SideNav";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TranslationProvider>
            <Header />
            <SideNav />
            <MobileNav />
            {children}
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
