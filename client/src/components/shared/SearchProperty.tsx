"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
const propertyType = [
  { label: "Rent", value: "rent" },
  { label: "Sale", value: "sale" },
] as const;

const formSchema = z.object({
  location: z.string().min(2, {
    message: "location must be at least 2 characters.",
  }),
  propertyType: z.string({
    required_error: "Please select a propertyType.",
  }),
});

export function SearchPropertyForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      propertyType: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row px-6
        md:flex-row lg:items-center lg:gap-5 md:gap-5 gap-y-3 inset-0 lg:bg-opacity-20 md:bg-opacity-20 py-5
         backdrop-filter lg:backdrop-blur-sm md:backdrop-blur-sm rounded-md lg:h-28 max-w-[40rem] md:bg-white"
      >
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Property Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "lg:w-[200px] md:w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? propertyType.find(
                            (propertyType) => propertyType.value === field.value
                          )?.label
                        : "Select propertyType"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="lg:w-[200px] md:w-[200px] w-[380px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search type..."
                      className="h-9"
                    />
                    <CommandEmpty>No property type found.</CommandEmpty>
                    <CommandGroup>
                      {propertyType.map((propertyType) => (
                        <CommandItem
                          value={propertyType.label}
                          key={propertyType.value}
                          onSelect={() => {
                            form.setValue("propertyType", propertyType.value);
                          }}
                        >
                          {propertyType.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              propertyType.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nairobi..."
                  {...field}
                  className={cn("w-[300px")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5">
          Browse property
        </Button>
      </form>
    </Form>
  );
}
