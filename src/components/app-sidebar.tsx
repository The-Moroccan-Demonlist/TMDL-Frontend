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
    OctagonMinus,
    Paintbrush,
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
    SidebarSeparator,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
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
import { usePlayerStore } from "@/stores/player-store";
import { useEffect } from "react";
import { getAuthenticatedPlayer } from "@/lib/services/player-service";
import api from "@/lib/axios";
import { useColorStore } from "@/stores/color-store";

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { setColor } = useColorStore()
    const { isMobile } = useSidebar();
    const { player, setPlayer } = usePlayerStore()
    const hasRestricted = player?.permissions?.includes("restricted")

    useEffect(() => {
        getAuthenticatedPlayer()
            .then(setPlayer)
            .catch((err) => {
                console.error("Error fetching player:", err)
            })
    }, [setPlayer])

    const handleLogout = async () => {
        try {
            await api.post(
                `/public/oauth/logout`,
                {},
            );

            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" className="font-medium">
                                <div className="bg-sidebar-primary-foreground text-accent-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image
                                        // src={theme === "dark" ? "/logo.png" : "/logo-black.png"}
                                        src="/logo-black.png"
                                        alt="The Moroccan Demonlist's Logo"
                                        height="500"
                                        width="500"
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


                        {hasRestricted && (
                            <>
                                <SidebarSeparator />
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild tooltip="Staff menu">
                                        <Link href="/staff">
                                            <OctagonMinus />
                                            <span>Staff menu</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem key="staff-levels">
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/staff/levels">Levels</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem key="staff-records">
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/staff/records">Records</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem key="staff-regions">
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/staff/regions">Regions</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem key="staff-badges">
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/staff/badges">Badges</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem key="staff-logs">
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/staff/logs">Logs</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            </>
                        )}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                {player ? (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={player.avatar} alt={player.username} />
                                            <AvatarFallback className="rounded-lg">
                                                {player.username?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{player.username}</span>
                                            {/* <span className="truncate text-xs">{player.email}</span> */}
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
                                                <AvatarImage src={player.avatar} alt={player.username} />
                                                <AvatarFallback className="rounded-lg">
                                                    {player.username?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {player.username}
                                                </span>
                                                {/* <span className="truncate text-xs">{player.email}</span> */}
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User className="text-foreground"/>
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Send className="text-foreground"/>
                                            Submissions
                                        </DropdownMenuItem>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>
                                                <div className="flex items-center gap-2 text-foreground">
                                                <Paintbrush width="16" height="16"/>
                                                Theme
                                                </div>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem onClick={() => { setTheme("light"); setColor("neutral"); }}>Light</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setTheme("dark"); setColor("neutral"); }}>Dark</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setTheme("dark"); setColor("stone"); }}>Stone</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setTheme("dark"); setColor("zinc"); }}>Zinc</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setTheme("dark"); setColor("gray"); }}>Gray</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => { setTheme("dark"); setColor("slate"); }}>Slate</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuItem>
                                            <Settings className="text-foreground"/>
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="text-foreground"/>
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