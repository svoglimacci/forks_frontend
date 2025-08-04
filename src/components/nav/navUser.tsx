"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { KeycloakTokenParsed } from "keycloak-js";
import { EllipsisVertical, LogOut } from "lucide-react";
import { useAuth } from "../authProvider/authContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const NavUser = ({ user }: KeycloakTokenParsed) => {
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="ghost" className="has-[>svg]:px-0">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <EllipsisVertical className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
        side={"bottom"}
      >
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavUser;
