import { updatePantryBody } from "@/api/endpoints/pantry-controller/pantry-controller.zod";
import type { GetAllIngredients200 } from "@/api/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import MultiSelect from "../multiSelect/MultiSelect";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function IngredientForm({
  ingredients,
  isLoading,
  onSubmit,
  isSubmitting,
}: {
  ingredients: GetAllIngredients200;
  isLoading: boolean;
  onSubmit: (data: z.infer<typeof updatePantryBody>) => void;
  isSubmitting: boolean;
}) {
  const form = useForm<z.infer<typeof updatePantryBody>>({
    resolver: zodResolver(updatePantryBody),
    defaultValues: {
      ingredients: [],
    },
  });

  const options =
    (ingredients as any)?.map(
      (ingredient: { name: any; id: { toString: () => any } }) => ({
        label: ingredient.name,
        value: ingredient.id?.toString() || "",
      }),
    ) || [];

  const handleSubmit = (data: z.infer<typeof updatePantryBody>) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <MultiSelect
                  options={options}
                  value={
                    field.value?.map(
                      (ingredient) => ingredient.id?.toString() || "",
                    ) || []
                  }
                  onChange={(selected) => {
                    field.onChange(
                      selected.map((id) => ({
                        id: parseInt(id, 10),
                      })),
                    );
                  }}
                  placeholder="Select ingredients..."
                  isLoading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Submit Recipe"}
        </Button>
      </form>
    </Form>
  );
}
