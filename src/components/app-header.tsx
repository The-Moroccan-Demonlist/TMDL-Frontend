"use client"

import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "./theme-switcher";

export function AppHeader() {
    const pathname = usePathname();

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const segments = pathname
        .split("/")
        .filter(Boolean)
        .map((segment, i, arr) => {
            const href = "/" + arr.slice(0, i + 1).join("/");
            return { name: capitalize(segment), href };
        });

    return (
        <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
                <BreadcrumbList>
                    {segments.length === 0 ? (
                        <div className="flex items-center">
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink asChild>
                                    <Link href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </div>
                    ) : (
                        segments.map((seg, i) => (
                            <div key={seg.href} className="flex items-center">
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink asChild>
                                        <Link href={seg.href}>{seg.name}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {i < segments.length - 1 && (
                                    <BreadcrumbSeparator className="ml-2 hidden md:block" />
                                )}
                            </div>
                        ))
                    )}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
                <ThemeSwitcher />
            </div>
        </div>
    )
}