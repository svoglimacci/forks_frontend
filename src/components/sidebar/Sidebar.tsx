import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  ShoppingBasket,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Recipes",
    url: "/recipes",
    icon: BookOpen,
  },
  {
    title: "Pantry",
    url: "/pantry",
    icon: ShoppingBasket,
  },
  {
    title: "Meal Planner",
    url: "/meal-planner",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const { location } = useRouterState();
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="[&>svg]:size-6 gap-x-4  group-data-[collapsible=icon]:[&>svg]:ml-1"
              onClick={() => toggleSidebar()}
            >
              {open ? <ChevronLeft /> : <ChevronRight />}
              <span className="text-lg">Collapse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="lg"
                    className="[&>svg]:size-6 gap-x-4 group-data-[collapsible=icon]:[&>svg]:ml-1"
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
