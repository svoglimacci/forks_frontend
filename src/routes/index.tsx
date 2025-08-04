import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ChefHat, ShoppingBasket } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full p-4 lg:p-6 xl:p-8">
      {/* Header Section */}
      <div className="h-1/4">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2 lg:mb-4">
          Welcome to Forks
        </h1>
        <h2 className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl">
          Your one-stop solution for all your kitchen needs.
        </h2>
      </div>
      <Separator className="mb-6 lg:mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6">
        <Card className="w-full h-full flex flex-col p-4 lg:p-6 xl:p-8">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              <ChefHat className="flex-shrink-0 text-primary h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
              <CardTitle className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold leading-tight">
                Quickly manage your favorite recipes
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex-1">
            <p className="text-muted-foreground text-xs lg:text-sm xl:text-base leading-relaxed">
              Forks is designed to help you easily manage your recipes, making
              cooking a breeze.
            </p>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              variant="outline"
              className="text-xs lg:text-sm xl:text-base h-7 lg:h-8 xl:h-9 2xl:h-10 ml-auto"
            >
              Explore Recipes
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full h-full flex flex-col p-4 lg:p-6 xl:p-8">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              <ShoppingBasket className="flex-shrink-0 text-primary h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
              <CardTitle className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold leading-tight">
                Manage your pantry and avoid waste
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground text-xs lg:text-sm xl:text-base leading-relaxed">
              Manage your pantry and avoid waste with Fork's pantry management
              system.
            </p>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              variant="outline"
              className="text-xs lg:text-sm xl:text-base h-7 lg:h-8 xl:h-9 2xl:h-10 ml-auto"
            >
              Manage Pantry
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full h-full flex flex-col p-4 lg:p-6 xl:p-8">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              <Calendar className="flex-shrink-0 text-primary h-6 w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12" />
              <CardTitle className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold leading-tight">
                Plan your meals
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex-1">
            <p className="text-muted-foreground text-xs lg:text-sm xl:text-base leading-relaxed">
              Use Forks to plan your meals for the week and make grocery
              shopping a breeze.
            </p>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              variant="outline"
              className="text-xs lg:text-sm xl:text-base h-7 lg:h-8 xl:h-9 2xl:h-10 ml-auto"
            >
              Go to Meal Planner
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
