import { AppSidebar } from "@/components/sidebar/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { CarrotIcon } from "lucide-react";
import { useAuth } from "../authProvider/authContext";
import NavUser from "../nav/navUser";
import { ThemeSwitcher } from "../themeProvider/themeSwitcher";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { login, user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  return (
    <div className="min-h-screen flex flex-col p-4 min-w-full bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 from-neutral-50 to-neutral-100">
      <header className=" px-4 flex items-center pb-2 gap-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <>
              <SidebarTrigger className=""></SidebarTrigger>
              <Separator className="h-6" orientation="vertical" />
            </>
          )}
          <CarrotIcon className="size-8 text-primary" />
          <span className="text-2xl font-bold">Forks</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <ThemeSwitcher />
          {isLoading ? null : user ? (
            <NavUser user={user} />
          ) : (
            <Button variant="outline" onClick={login}>
              Login
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden ">
        <AppSidebar />
        <main className="flex-1 overflow-hidden p-4">{children}</main>
      </div>
      <footer className="px-2">
        <div className="w-full">
          <p>© {new Date().getFullYear()} Forks</p>
        </div>
      </footer>
    </div>
  );
}
