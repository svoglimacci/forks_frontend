import type { AuthContextProps } from "@/components/authProvider/authContext";

import Layout from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/themeProvider/themeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContextProps;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider defaultOpen={false}>
        <Layout>
          <Outlet />
        </Layout>
        <TanStackRouterDevtools position="bottom-right" />
      </SidebarProvider>
    </ThemeProvider>
  );
}
