import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/meal-planner")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>
        <div className="mb-4">
          <p className="mb-2">This feature is under development.</p>
          <p>Please check back later for updates.</p>
        </div>
      </div>
    </div>
  );
}
