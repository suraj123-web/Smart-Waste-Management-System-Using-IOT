"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarGroupLabel,
  useSidebar,
} from '@/components/ui/sidebar'; // Assuming this path is correct for your setup
import { LayoutDashboard, LogOut, Settings, Trash2, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

function UserNav() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const initials = user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://placehold.co/100x100.png?text=${initials}`} alt={user.email || "User"} data-ai-hint="avatar profile" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {/* Placeholder for profile */}}>
          <UserCircle className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {/* Placeholder for settings */}}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const sidebarItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: 'https://blynk.cloud/dashboard/507091/templates/1069516/dashboard', label: 'Bin Satus', icon: LayoutDashboard },
    // Add more items here if needed
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex items-center justify-between p-2">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90">
          <Trash2 className="h-8 w-8" />
          {state === 'expanded' && <span className="text-2xl font-semibold">BinSight</span>}
        </Link>
        <div className="md:hidden"> {/* Show trigger only on mobile in header if sidebar is part of Sheet */}
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {sidebarItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, className: "bg-card text-card-foreground border-border" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {state === 'expanded' && (
        <SidebarFooter className="p-2 border-t border-sidebar-border">
           <p className="text-xs text-sidebar-foreground/70 text-center">
            © {new Date().getFullYear()} BinSight
          </p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="md:hidden"> {/* Hidden on desktop, sidebar trigger is part of sidebar itself */}
               <SidebarTrigger/>
            </div>
             <div className="flex-1 text-center md:text-left">
              {/* Optional: Breadcrumbs or Page Title here if needed */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
