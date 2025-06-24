"use client"

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/theme-store";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <AppHeader />
                </header>
                <main className="m-4">
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
