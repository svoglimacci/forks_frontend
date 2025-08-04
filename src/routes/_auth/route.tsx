import { useAuth } from "@/components/authProvider/authContext";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  } else if (!auth.authenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="mb-4">You must be logged in to access this page.</p>
          <Button onClick={auth.login}>Login</Button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
