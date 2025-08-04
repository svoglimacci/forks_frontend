import {
  getGetPantryByUserIdQueryKey,
  useGetPantryByUserId,
  useUpdatePantry,
} from "@/api/endpoints/pantry-controller/pantry-controller";
import Spinner from "@/components/spinner/Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetAllIngredients } from "@/api/endpoints/ingredient/ingredient";
import type { updatePantryBody } from "@/api/endpoints/pantry-controller/pantry-controller.zod";
import type { GetAllIngredients200 } from "@/api/model";
import { IngredientForm } from "@/components/ingredientForm/IngredientForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisVertical, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import type z from "zod";
export const Route = createFileRoute("/_auth/pantry")({
  component: RouteComponent,
});

const createColumns = (onRemove: (id: number) => void): ColumnDef<any>[] => [
  {
    accessorKey: "name",

    header: "Ingredient Name",
    cell: (info) => info.getValue(),
  },
  {
    id: "actions",

    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onRemove(row.original.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchQuery?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchQuery,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="**:data-[slot=table-cell]:first:w-full">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {searchQuery?.trim() ? (
                  <div>
                    <p className="text-muted-foreground">
                      No ingredients found for "{searchQuery}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try searching with different keywords
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground">
                      No ingredients in your pantry yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add some ingredients to get started
                    </p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: response, isLoading } = useGetPantryByUserId();
  const { data: ingredients, isLoading: ingredientsLoading } =
    useGetAllIngredients();
  const ingredientsList = ingredients?.data;
  const queryClient = useQueryClient();
  const pantryItems = response?.data.ingredients || [];

  // Filter pantry items based on search query
  const filteredPantryItems = pantryItems.filter((ingredient) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const nameMatch = ingredient.name?.toLowerCase().includes(query);

    return nameMatch;
  });

  const updatePantryMutation = useUpdatePantry({
    mutation: {
      onSuccess: (data) => {
        console.log("Pantry updated successfully:", data);
        queryClient.invalidateQueries({
          queryKey: getGetPantryByUserIdQueryKey(),
        });
      },
      onError: (error) => {
        console.error("Error updating pantry:", error);
      },
    },
  });
  const handleUpdatePantry = (data: z.infer<typeof updatePantryBody>) => {
    const currentIngredients = pantryItems;
    const newIngredients = data.ingredients || [];
    const allIngredients = [...currentIngredients, ...newIngredients];

    // Remove duplicates based on id and filter out any undefined values
    const updatedIngredients = allIngredients
      .filter((ingredient) => ingredient && ingredient.id)
      .filter(
        (ingredient, index, self) =>
          index === self.findIndex((i) => i.id === ingredient.id),
      );

    updatePantryMutation.mutate({
      data: {
        ...data,
        ingredients: updatedIngredients,
      },
    });
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    const updatedIngredients = pantryItems.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );

    updatePantryMutation.mutate({
      data: {
        ingredients: updatedIngredients,
      },
    });
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
        <h1 className="text-2xl font-bold">Ingredients</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon />
                <span className="hidden lg:inline">Add Ingredients</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Add Ingredients</DialogTitle>
              <DialogDescription>
                Select ingredients to add to your pantry.
              </DialogDescription>
              <IngredientForm
                ingredients={ingredientsList as GetAllIngredients200}
                isLoading={ingredientsLoading}
                onSubmit={handleUpdatePantry}
                isSubmitting={updatePantryMutation.isPending}
              />
            </DialogContent>
          </Dialog>

          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search ingredients..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <DataTable
        columns={createColumns(handleRemoveIngredient)}
        data={filteredPantryItems}
        searchQuery={searchQuery}
      />
    </div>
  );
}
