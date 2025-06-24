"use client"

import {
    Star,
    Moon,
    Trophy,
    Earth,
    Info,
    ChevronsUpDown,
    Send,
    User,
    Settings,
    LogOut,
    Target,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuSubButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "./ui/avatar";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" className="font-medium">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image
                                        src="/logo.png"
                                        alt="The Moroccan Demonlist's Logo"
                                        height="500"
                                        width="500"
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-medium">The Moroccan Demonlist</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Classic demonlist">
                                <Link href="/">
                                    <Star />
                                    <span>Classic demonlist</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem key="platformer-main-list">
                                    <SidebarMenuSubButton asChild>
                                        <Link href="/">Main list</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem key="platformer-extended-list">
                                    <SidebarMenuSubButton asChild>
                                        <Link href="/">Extended list</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem key="platformer-legacy-list">
                                    <SidebarMenuSubButton asChild>
                                        <Link href="/">Legacy list</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Platformer demonlist">
                                <Link href="/">
                                    <Moon />
                                    <span>Platformer demonlist</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem key="platformer-main-list">
                                    <SidebarMenuSubButton asChild>
                                        <Link href="/sidebar/test">Main list</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem key="platformer-extended-list">
                                    <SidebarMenuSubButton asChild>
                                        <Link href="/">Extended list</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                <SidebarMenuSubItem key="platformer-legacy-list">
                                    <SidebarMenuSubButton asChild>
                                        <Link href="/">Legacy list</Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Leaderboard">
                                <Link href="/">
                                    <Trophy />
                                    <span>Leaderboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Stat viewer">
                                <Link href="/">
                                    <Earth />
                                    <span>Stat Viewer</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Roulette">
                                <Link href="/">
                                    <Target />
                                    <span>Roulette</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip="Guidelines">
                                <Link href="/">
                                    <Info />
                                    <span>Guidelines</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                {profile ? (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={profile.avatar} alt={profile.username} />
                                            <AvatarFallback className="rounded-lg">
                                                {profile.username?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{profile.username}</span>
                                            {/* <span className="truncate text-xs">{profile.email}</span> */}
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={profile.avatar} alt={profile.username} />
                                                <AvatarFallback className="rounded-lg">
                                                    {profile.username?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {profile.username}
                                                </span>
                                                {/* <span className="truncate text-xs">{profile.email}</span> */}
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Send />
                                            Submissions
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings />
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => window.location.href = "http://localhost:8080/api/public/oauth/logout"}>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                ) : (
                    <Button
                        onClick={() => {
                            window.location.href = "http://localhost:8080/api/public/oauth/login";
                        }}
                    >
                        Sign in with Google
                    </Button>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}