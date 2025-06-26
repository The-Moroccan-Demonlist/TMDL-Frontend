"use client"

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { useEffect, useState } from "react";
import { useColorStore } from "@/stores/color-store";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const color = useColorStore((state) => state.color);

  useEffect(() => {
    document.documentElement.setAttribute("data-color", color)
  }, [color])

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
