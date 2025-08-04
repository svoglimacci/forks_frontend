import { useGetAllIngredients } from "@/api/endpoints/ingredient/ingredient";
import { useGetPantryByUserId } from "@/api/endpoints/pantry-controller/pantry-controller";
import {
  getGetAllRecipesByAuthorIdQueryKey,
  useCreateRecipe,
  useDeleteRecipe,
  useGetAllRecipesByAuthorId,
} from "@/api/endpoints/recipe/recipe";
import { createRecipeBody } from "@/api/endpoints/recipe/recipe.zod";
import type { GetAllIngredients200 } from "@/api/model";
import { RecipeForm } from "@/components/recipeForm/RecipeForm";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Check, PlusIcon, SearchIcon, X } from "lucide-react";
import { useState } from "react";
import z from "zod";

export const Route = createFileRoute("/_auth/recipes")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { data: response, isLoading } = useGetAllRecipesByAuthorId();
  const recipes = response?.data || [];
  const { data: pantry } = useGetPantryByUserId();
  const { data: ingredients, isLoading: ingredientsLoading } =
    useGetAllIngredients();
  const ingredientsList = ingredients?.data;

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const titleMatch = recipe.title?.toLowerCase().includes(query);
    const descriptionMatch = recipe.description?.toLowerCase().includes(query);
    const ingredientMatch = recipe.ingredients?.some((ingredient: any) =>
      ingredient.name?.toLowerCase().includes(query),
    );

    return titleMatch || descriptionMatch || ingredientMatch;
  });

  const hasAllIngredients = (recipe: any) => {
    const totalIngredients = recipe.ingredients.length;
    const pantryItems = pantry?.data?.ingredients || [];
    const availableIngredients = pantryItems.filter((ingredients) =>
      recipe.ingredients.some(
        (ingredient: { id: number }) => ingredient.id === ingredients.id,
      ),
    );

    return { totalIngredients, availableIngredients };
  };

  const deleteRecipeMutation = useDeleteRecipe({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetAllRecipesByAuthorIdQueryKey(),
        });
      },
      onError: (error) => {
        console.error("Error deleting recipe:", error);
      },
    },
  });

  const createRecipeMutation = useCreateRecipe({
    mutation: {
      onSuccess: (data) => {
        console.log("Recipe created successfully:", data);
        queryClient.invalidateQueries({
          queryKey: getGetAllRecipesByAuthorIdQueryKey(),
        });
      },
      onError: (error) => {
        console.error("Error creating recipe:", error);
      },
    },
  });

  const handleCreateRecipe = (data: z.infer<typeof createRecipeBody>) => {
    createRecipeMutation.mutate({ data });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon />
                <span className="hidden lg:inline">Add Recipe</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Create Recipe</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new recipe.
              </DialogDescription>
              <RecipeForm
                ingredients={ingredientsList as GetAllIngredients200}
                isLoading={ingredientsLoading}
                onSubmit={handleCreateRecipe}
                isSubmitting={createRecipeMutation.isPending}
              />
            </DialogContent>
          </Dialog>

          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search recipes..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length === 0 && searchQuery.trim() ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">
              No recipes found for "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching with different keywords or create a new recipe
            </p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">No recipes yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Create your first recipe to get started
            </p>
          </div>
        ) : (
          filteredRecipes?.map((recipe) => (
            <Card key={recipe.id} className="flex flex-col h-full">
              <CardHeader className="p-0 -mt-6 overflow-hidden rounded-lg relative">
                <img
                  src="https://placehold.co/300x200"
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />

                <Button
                  className="absolute top-1 right-1"
                  variant="ghost"
                  onClick={() =>
                    deleteRecipeMutation.mutate({ recipeId: recipe.id! })
                  }
                >
                  <X className="text-red-600 size-6" />
                </Button>
              </CardHeader>

              <CardContent className="flex-grow">
                <CardTitle className="mb-2">{recipe.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {recipe.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                {(() => {
                  const { totalIngredients, availableIngredients } =
                    hasAllIngredients(recipe);
                  const hasAll =
                    totalIngredients === availableIngredients.length;

                  return (
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      {hasAll ? (
                        <>
                          <Check className="text-green-700" />
                          All ingredients available
                        </>
                      ) : (
                        <>
                          <X className="text-red-700" />
                          {availableIngredients.length} / {totalIngredients}{" "}
                          ingredients
                        </>
                      )}
                    </span>
                  );
                })()}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
